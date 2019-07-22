import * as React from 'react';
import {connect} from 'react-redux';

import SmallMovieCard from '../small-movie-card/small-movie-card';
import {ActionCreator as MoviesActionCreator} from "../../reducers/movies/actions";
import {ActionCreator as SelectedGenreActionCreator} from '../../reducers/selected-genre/actions';
import {getGenres, getMoviesLoaded, getMoviesLoading, getMoviesLoadingError} from '../../reducers/movies/selectors';
import {getMoviesForSelectedGenre, getSelectedGenre} from '../../reducers/selected-genre/selector';
import {Movie} from '../../types';
import Spinner from '../spinner/spinner';

interface Props {
  movies: Movie[];
  moviesLoaded: boolean,
  moviesLoading: boolean,
  moviesLoadingError: boolean,
  genres: string[];
  selectedGenre: string,
  loadMovies: () => void;
  setGenre: (genre: string) => void,
}

interface State {
  showLimit: number;
}

const INITIAL_MOVIES_COUNT = 12;
const SHOW_MORE_COUNT = 8;

class Catalog extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.handleOnGenreClick = this.handleOnGenreClick.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
    this.state = {
      showLimit: INITIAL_MOVIES_COUNT
    };
  }

  componentDidMount() {
    const {moviesLoading, loadMovies} = this.props;
    if (!moviesLoading) {
      loadMovies();
    }
  }

  render() {
    const {
      movies,
      genres,
      selectedGenre,
      moviesLoading,
      moviesLoadingError
    } = this.props;

    if (moviesLoading) {
      return <section className="catalog">
        <Spinner style={{
          backgroundColor: `#EEE5B5`,
          height: `300px`,
        }}/>
      </section>;
    }

    if (moviesLoadingError) {
      return <section
        className="catalog"
        style={{textAlign: `center`}}>
        <h3>Opps... Movies catalog loading error (</h3>
      </section>;
    }

    return <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${selectedGenre || `catalog__genres-item--active`}`}>
          <a href="#" className="catalog__genres-link"
             onClick={(evt: React.MouseEvent) => this.handleOnGenreClick(evt, ``)}>
            All genre
          </a>
        </li>
        {genres.map((genre) => {
          return <li key={genre}
            className={`catalog__genres-item ${selectedGenre === genre && `catalog__genres-item--active`}`}>
            <a href="#" className="catalog__genres-link"
               onClick={(evt: React.MouseEvent) => this.handleOnGenreClick(evt, genre)}>
              {genre}
            </a>
          </li>;
        })}
      </ul>

      <div className="catalog__movies-list">
        {movies.slice(0, this.state.showLimit).map((movie) => <SmallMovieCard movie={movie} key={movie.id}/>)}
      </div>
      {movies.length > this.state.showLimit && <div className="catalog__more">
          <button className="catalog__button" onClick={this.handleShowMoreClick} type="button">
            Show more
          </button>
      </div>}
    </section>;
  }

  handleOnGenreClick(evt: React.MouseEvent, genre: string) {
    evt.preventDefault();
    this.props.setGenre(genre);
  }

  handleShowMoreClick(evt: React.MouseEvent) {
    evt.preventDefault();
    this.setState({
      showLimit: this.state.showLimit + SHOW_MORE_COUNT
    });
  }
}

const mapStateToPops = (state, ownProps) => ({
  ...ownProps,
  movies: getMoviesForSelectedGenre(state),
  moviesLoaded: getMoviesLoaded(state),
  moviesLoading: getMoviesLoading(state),
  moviesLoadingError: getMoviesLoadingError(state),
  genres: getGenres(state),
  selectedGenre: getSelectedGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies: () => dispatch(MoviesActionCreator.moviesLoad()),
  setGenre: (genre) => dispatch(SelectedGenreActionCreator.setSelectedGenre(genre)),
});

export default connect(mapStateToPops, mapDispatchToProps)(Catalog);
