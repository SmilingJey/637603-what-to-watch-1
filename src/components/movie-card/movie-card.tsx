import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Movie} from '../../types';
import Header from '../header/header';
import MovieComments from '../movie-comments/movie-comments';
import {ActionCreator as FavoritesActionCreator} from '../../reducers/favorites/actions';
import PlayButton from '../../containers/play-button/play-button';

interface Props {
  movie: Movie;
  changeFavorite: (movie: Movie) => void;
}

enum MovieCardTabs {
  OVERVIEW = 0,
  DETAILS,
  REVIEWS
}

interface State {
  activeTab: MovieCardTabs
}

class MovieCard extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.state = {
      activeTab: MovieCardTabs.OVERVIEW
    };
  }

  render() {
    const {movie} = this.props;
    const {activeTab} = this.state;
    return <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt="The Grand Budapest Hotel"/>
        </div>
        <Header />
        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genre}</span>
              <span className="movie-card__year">{movie.released}</span>
            </p>
            <div className="movie-card__buttons">
              <PlayButton movie={movie}>
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
              </PlayButton>
              <button className="btn btn--list movie-card__button" type="button"
                onClick={this.handleFavoriteClick}>
                {movie.isFavorite ? <svg viewBox="0 0 18 14" width="18" height="14">
                  <use xlinkHref="#in-list"/>
                </svg> : <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"/>
                </svg>}
                <span>My list</span>
              </button>
              <Link to={`/film/${movie.id}/review`} className="btn movie-card__button">
                Add review
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={movie.posterImage} alt={`${movie.name} poster`} width="218"
                 height="327"/>
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className={`movie-nav__item
                     ${activeTab === MovieCardTabs.OVERVIEW && `movie-nav__item--active`}`}>
                  <a href="#" className="movie-nav__link"
                     onClick={(evt) => this.handlePageClick(evt, MovieCardTabs.OVERVIEW)}>
                    Overview
                  </a>
                </li>
                <li className={`movie-nav__item
                     ${activeTab === MovieCardTabs.DETAILS && `movie-nav__item--active`}`}>
                  <a href="#" className="movie-nav__link"
                     onClick={(evt) => this.handlePageClick(evt, MovieCardTabs.DETAILS)}>
                    Details
                  </a>
                </li>
                <li className={`movie-nav__item
                     ${activeTab === MovieCardTabs.REVIEWS && `movie-nav__item--active`}`}>
                  <a href="#" className="movie-nav__link"
                     onClick={(evt) => this.handlePageClick(evt, MovieCardTabs.REVIEWS)}>
                    Reviews
                  </a>
                </li>
              </ul>
            </nav>

            {activeTab === MovieCardTabs.OVERVIEW && <>
              <div className="movie-rating">
                <div className="movie-rating__score">{movie.rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{this.getMovieLevel(movie.rating)}</span>
                  <span className="movie-rating__count">{movie.scoresCount} ratings</span>
                </p>
              </div>
              <div className="movie-card__text">
                <p>{movie.description}</p>
                <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>
                <p className="movie-card__starring"><strong>Starring:
                  {movie.starring.slice(0, 3).join(`, `)}
                </strong></p>
              </div>
            </>}

            {activeTab === MovieCardTabs.DETAILS && <>
              <div className="movie-card__text movie-card__row">
                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Director </strong>
                    <span className="movie-card__details-value">{movie.director}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Starring </strong>
                    <span className="movie-card__details-value">
                      {movie.starring.map((it, idx) => {
                        return <React.Fragment key={it}>
                          {it}{idx < movie.starring.length - 1 && <>,<br/></>}
                        </React.Fragment>;
                      })}
                    </span>
                  </p>
                </div>
                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Run Time</strong>
                    <span className="movie-card__details-value">1h 39m</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Genre</strong>
                    <span className="movie-card__details-value">{movie.genre}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Released</strong>
                    <span className="movie-card__details-value">{movie.released}</span>
                  </p>
                </div>
              </div>
            </>}

            {activeTab === MovieCardTabs.REVIEWS && <MovieComments key={movie.id} movieId={movie.id}/>}
          </div>
        </div>
      </div>
    </section>;
  }

  handlePageClick(evt, tab: MovieCardTabs) {
    evt.preventDefault();
    this.setState({
      activeTab: tab
    });
  }

  handleFavoriteClick() {
    const {movie, changeFavorite} = this.props;
    changeFavorite(movie);
  }

  getMovieLevel(rating: number): string {
    if (rating < 3) {
      return `Bad`;
    } else if (rating < 5) {
      return `Normal`;
    } else if (rating < 8) {
      return `Good`;
    } else if (rating < 10) {
      return `Very good`;
    }
    return `Awesome`;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  changeFavorite: (movie) => dispatch(FavoritesActionCreator.changeFavorites(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
