import * as React from 'react';
import {connect} from 'react-redux';
import {
  getMoviesLoaded,
  getMoviesLoading,
  getMoviesLoadingError,
  getMoviesByGenre
} from '../../reducers/movies/selectors';
import {ActionCreator as MoviesActionCreator} from '../../reducers/movies/actions';
import {Movie} from '../../types';
import SmallMovieCard from '../small-movie-card/small-movie-card';

interface Props {
  movie: Movie,
  movies: Movie[],
  moviesLoaded: boolean,
  moviesLoading: boolean,
  moviesLoadingError: string,
  loadMovies: () => void,
}

const SIMILAR_MAX_COUNT = 4;

class SimilarMovies extends React.PureComponent<Props, null> {
  componentDidMount() {
    const {moviesLoading, moviesLoaded, loadMovies} = this.props;
    if (!moviesLoading && !moviesLoaded) {
      loadMovies();
    }
  }

  render() {
    const {movies} = this.props;

    return <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__movies-list">
        {movies.map((movie) => <SmallMovieCard key={movie.id} movie={movie}/>)}
      </div>
    </section>;
  }
}

const mapStateToPops = (state, ownProps) => ({
  ...ownProps,
  movies: getMoviesByGenre(state, ownProps.movie.genre)
    .filter((movie) => movie.id !== ownProps.movie.id).slice(0, SIMILAR_MAX_COUNT),
  moviesLoaded: getMoviesLoaded(state),
  moviesLoading: getMoviesLoading(state),
  moviesLoadingError: getMoviesLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies: () => dispatch(MoviesActionCreator.moviesLoad()),
});

export default connect(mapStateToPops, mapDispatchToProps)(SimilarMovies);
