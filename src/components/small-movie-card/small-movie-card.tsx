import * as React from 'react';
import {Link} from 'react-router-dom';

import {Movie} from '../../types';

interface IProps {
    movie: Movie;
}

interface IState {
  showPreview: boolean
}

class SmallMovieCard extends React.PureComponent<IProps, IState> {
  private timerID: number | undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {
      showPreview: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearTimeout(this.timerID);
    }
  }

  render() {
    const {movie} = this.props;
    const {showPreview} = this.state;
    return <article className="small-movie-card catalog__movies-card"
      onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
    >
      <Link to={`/film/${movie.id}`}>
        <div className="small-movie-card__image">
          {showPreview ? <video
              className="small-movie-card__video"
              poster={movie.previewImage}
              src={movie.previewVideoLink}
              muted autoPlay /> :
            <img src={movie.previewImage} alt={movie.name} width="280" height="175"/>
          }
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`/film/${movie.id}`} className="small-movie-card__link">
          {movie.name}
        </Link>
      </h3>
    </article>;
  }

  handleMouseEnter() {
    this.timerID = window.setTimeout(function() {
      this.setState({
        showPreview: true
      });
    }.bind(this), 1000);
  }

  handleMouseLeave() {
    clearTimeout(this.timerID);
    this.setState({
      showPreview: false
    });
  }
}

export default SmallMovieCard;
