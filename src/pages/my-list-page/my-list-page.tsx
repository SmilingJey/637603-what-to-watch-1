import * as React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {ActionCreator} from '../../reducers/favorites/actions';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import SmallMovieCard from '../../components/small-movie-card/small-movie-card';
import Spinner from '../../components/spinner/spinner';

import withAuthorisationRequired from '../../containers/with-authorization-required/with-authorization-require';

import {Movie} from '../../types';
import {getFavorites, getLoading, getLoadingError} from '../../reducers/favorites/selectors';

interface IProps {
  movies: Movie[],
  loading: boolean,
  loadingError: boolean,
  loadFavorites: () => void,
}

class MyListPage extends React.PureComponent<IProps, null> {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {movies, loading, loadingError} = this.props;

    return <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {loading && <Spinner />}
        {loadingError && <h3 style={{color: `red`, textAlign: `center`}} />}
        <div className="catalog__movies-list">
          {movies.map((movie) => <SmallMovieCard key={movie.id} movie={movie}/>)}
        </div>
      </section>
      <Footer />
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  movies: getFavorites(state),
  loading: getLoading(state),
  loadingError: getLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => dispatch(ActionCreator.loadFavorites()),
});

export default compose(
  withAuthorisationRequired,
  connect(mapStateToProps, mapDispatchToProps)
)(MyListPage);
