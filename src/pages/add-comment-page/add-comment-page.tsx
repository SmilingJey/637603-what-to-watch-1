import * as React from 'react';
import {compose} from 'recompose';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {getMovieById, getMoviesLoaded, getMoviesLoading, getMoviesLoadingError} from '../../reducers/movies/selectors';
import {getSending, getSendingSuccess, getSendingError} from '../../reducers/post-comment/selectors';
import {ActionCreator as MoviesActionCreator} from '../../reducers/movies/actions';
import {ActionCreator as SendCommentActionCreator} from '../../reducers/post-comment/actions';
import {Movie} from '../../types';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Spinner from '../../components/spinner/spinner';
import withAuthorisationRequired from '../../containers/with-authorization-required/with-authorization-require';

interface IFormValues {
  rating: string,
  ['review-text']: string
}

interface IState {
  successRedirect: boolean;
}

interface IProps {
  movie: Movie,
  moviesLoaded: boolean,
  moviesLoading: boolean,
  moviesLoadingError: boolean,
  sending: boolean,
  sendSuccess: boolean,
  sendError: boolean,
  loadMovies: () => void,
  sendComment: (movieId: number, formData: IFormValues) => void,
}

class AddCommentPage extends React.PureComponent <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      successRedirect: false
    };
  }

  componentDidMount() {
    const {moviesLoading, moviesLoaded, loadMovies} = this.props;
    if (!moviesLoading && !moviesLoaded) {
      loadMovies();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.sendSuccess && this.props.sendSuccess) {
      this.setState({successRedirect: true});
    }
  }

  render() {
    const {moviesLoading, moviesLoadingError, movie, sendComment, sending, sendError} = this.props;

    if (this.state.successRedirect) {
      return <Redirect to={`/film/${movie.id}`} />;
    }

    if (moviesLoading) {
      return <section className="movie-card movie-card--full">
        <Spinner style={{height: "300px"}}/>
      </section>;
    }

    if (moviesLoadingError) {
      return <section className="movie-card movie-card--full">
        <h3 style={{textAlign: `center`}}>Loading error</h3>
      </section>;
    }

    if (!movie) {
      return <section className="movie-card movie-card--full">
        <h3 style={{textAlign: `center`}}>Movie not found</h3>
      </section>;
    }

    return <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.name}/>
        </div>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/film/${movie.id}`} className="breadcrumbs__link">
                  {movie.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/film/${movie.id}/review`} className="breadcrumbs__link">
                  Add review
                </Link>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.posterImage} alt={`${movie.name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <Formik
          initialValues={{rating: `0`, ['review-text']: ``}}
          onSubmit={(values) => {
            sendComment(movie.id, values);
          }}
          render={({values}) => (
            <Form action="#" className="add-review__form">
              <div className="rating">
                <div className="rating__stars">
                  <Field className="rating__input" id="star-1"
                         type="radio" name="rating" value="1"
                         checked={values.rating === `1`}
                         validate={this.validateStars}/>
                  <label className="rating__label" htmlFor="star-1">Rating 1</label>

                  <Field className="rating__input" id="star-2"
                         type="radio" name="rating" value="2"
                         checked={values.rating === `2`}
                         validate={this.validateStars}/>
                  <label className="rating__label" htmlFor="star-2">Rating 2</label>

                  <Field className="rating__input" id="star-3"
                         type="radio" name="rating" value="3"
                         checked={values.rating === `3`}
                         validate={this.validateStars}/>
                  <label className="rating__label" htmlFor="star-3">Rating 3</label>

                  <Field className="rating__input" id="star-4"
                         type="radio" name="rating" value="4"
                         checked={values.rating === `4`}
                         validate={this.validateStars}/>
                  <label className="rating__label" htmlFor="star-4">Rating 4</label>

                  <Field className="rating__input" id="star-5"
                         type="radio" name="rating" value="5"
                         checked={values.rating === `5`}
                         validate={this.validateStars}/>
                  <label className="rating__label" htmlFor="star-5">Rating 5</label>
                </div>
                <ErrorMessage name="rating" component="p"
                              className="add-review__input-error"/>
              </div>
              <div className="add-review__text">
                <Field component="textarea" className="add-review__textarea"
                       name="review-text" id="review-text"
                       validate={this.validateReview} placeholder="Review text" />
                <ErrorMessage name="review-text" component="p"
                              className="add-review__input-error"/>
                <div className="add-review__submit">
                  <button className="add-review__btn" type="submit" disabled={sending}>
                    Post
                  </button>
                </div>
                {sendError && <p className="add-review__input-error">{sendError}</p>}
              </div>
            </Form>
          )}
        />
      </div>
    </section>;
  }

  validateStars(value) {
    let error;
    if (Number(value) < 1 || Number(value) > 5) {
      error = `Please, enter stars count`;
    }
    return error;
  }

  validateReview(value) {
    let error;
    if (!value || value.length < 50) {
      error = `Review must be longer than 50 characters`;
    }
    if (value.length > 400) {
      error = `Review can not be more than 400 characters`;
    }
    return error;
  }
}

const mapStateToPops = (state, ownProps) => ({
  ...ownProps,
  movie: getMovieById(state, Number(ownProps.match.params.id)),
  moviesLoaded: getMoviesLoaded(state),
  moviesLoading: getMoviesLoading(state),
  moviesLoadingError: getMoviesLoadingError(state),

  sending: getSending(state, Number(ownProps.match.params.id)),
  sendSuccess: getSendingSuccess(state, Number(ownProps.match.params.id)),
  sendError: getSendingError(state, Number(ownProps.match.params.id)),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies: () => dispatch(MoviesActionCreator.moviesLoad()),
  sendComment: (movieId, formData) => {
    return dispatch(SendCommentActionCreator.postComment(movieId, formData));
  },
});

export default compose(
  withAuthorisationRequired,
  connect(mapStateToPops, mapDispatchToProps)
)(AddCommentPage);
