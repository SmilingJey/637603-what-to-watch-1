import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Header from '../header/header';
import Spinner from '../spinner/spinner';
import PlayButton from '../../containers/play-button/play-button';

import {ActionCreator as MoviesActionCreator} from '../../reducers/movies/actions';
import {
  getPromo,
  getPromoLoaded,
  getPromoLoading,
  getPromoLoadingError
} from '../../reducers/movies/selectors';
import {Movie} from '../../types';
import {ActionCreator as FavoritesActionCreator} from '../../reducers/favorites/actions';

interface IProps {
  promo: Movie,
  promoLoaded: boolean,
  promoLoading: boolean,
  promoLoadingError: string,
  loadPromo: () => void,
  changeFavorite: (movie: Movie) => void,
}

class PromoMovie extends React.PureComponent<IProps, null> {
  constructor(props: IProps) {
    super(props);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentDidMount() {
    const {loadPromo} = this.props;
    loadPromo();
  }

  render() {
    const {promo, promoLoaded, promoLoadingError} = this.props;

    if (!promoLoaded) {
      return <section className="movie-card">
        <div className="movie-card__bg">
        </div>
        <Header />
        <div className="movie-card__wrap">
          <Spinner style={{height: `200px`}}/>
        </div>
      </section>;
    }

    if (promoLoadingError) {
      return <section className="movie-card">
        <div className="movie-card__bg">
        </div>
        <Header />
        <div className="movie-card__wrap">
          <h3 style={{textAlign: `center`}}>
            Opps... Promo movie loading error
          </h3>
        </div>
      </section>;
    }

    return <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promo.backgroundImage} alt={promo.name}/>
      </div>
      <Header />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <Link to={`/film/${promo.id}`} className="small-movie-card__link">
              <img src={promo.posterImage} alt={`${promo.name} poster`} width="218"
                   height="327"/>
            </Link>
          </div>
          <div className="movie-card__desc">
            <Link to={`/film/${promo.id}`} className="movie-card__title-link">
              <h2 className="movie-card__title">{promo.name}</h2>
            </Link>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promo.genre}</span>
              <span className="movie-card__year">{promo.released}</span>
            </p>
            <div className="movie-card__buttons">
              <PlayButton movie={promo}>
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
              </PlayButton>
              <button className="btn btn--list movie-card__button" type="button"
                onClick={this.handleFavoriteClick}>
                {promo.isFavorite ? <svg viewBox="0 0 18 14" width="18" height="14">
                  <use xlinkHref="#in-list"/>
                </svg> : <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"/>
                </svg>}
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
  }

  handleFavoriteClick() {
    const {promo, changeFavorite} = this.props;
    changeFavorite(promo);
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  promo: getPromo(state),
  promoLoaded: getPromoLoaded(state),
  promoLoading: getPromoLoading(state),
  promoLoadingError: getPromoLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPromo: () => dispatch(MoviesActionCreator.promoLoad()),
  changeFavorite: (movie) => dispatch(FavoritesActionCreator.changeFavorites(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoMovie);
