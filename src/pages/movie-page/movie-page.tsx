import * as React from 'react';
import {connect} from 'react-redux';

import {
  getMovieById,
  getMoviesLoading,
  getMoviesLoaded,
  getMoviesLoadingError
} from '../../reducers/movies/selectors';
import {ActionCreator as MoviesActionCreator} from '../../reducers/movies/actions';
import {Movie} from '../../types';
import SimilarMovies from '../../components/similar-movies/similar-movies';
import MovieCard from '../../components/movie-card/movie-card';
import Footer from '../../components/footer/footer';

interface Props {
  movie: Movie,
  moviesLoaded: boolean,
  moviesLoading: boolean,
  moviesLoadingError: boolean,
  loadMovies: () => void,
}

class MoviePage extends React.PureComponent<Props, null> {
  componentDidMount() {
    const {moviesLoading, moviesLoaded, loadMovies} = this.props;
    if (!moviesLoading && !moviesLoaded) {
      loadMovies();
    }
  }

  render() {
    const {movie} = this.props;

    if (!movie) {
      return <div />;
    }

    return <>
      <MovieCard movie={movie}/>
      <div className="page-content">
        {movie && <SimilarMovies movie={movie}/>}
        <Footer/>
      </div>
    </>;
  }
}

const mapStateToPops = (state, ownProps) => ({
  ...ownProps,
  movie: getMovieById(state, Number(ownProps.match.params.id)),
  moviesLoaded: getMoviesLoaded(state),
  moviesLoading: getMoviesLoading(state),
  moviesLoadingError: getMoviesLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies: () => dispatch(MoviesActionCreator.moviesLoad()),
});

export default connect(mapStateToPops, mapDispatchToProps)(MoviePage);
