import {call, put, takeLatest} from "redux-saga/effects";

import {watchLoadMovies, workerLoadMovies, workerLoadPromo} from './movies';
import {loadMovies, loadPromo} from '../../services/movies';
import {ActionCreator} from '../../reducers/movies/actions';
import {Movie} from '../../types';

describe('Load movies saga:', () => {
  it(`Test success load all movies`, () => {
    const generator = workerLoadMovies();
    const mockData = [];
    expect(generator.next().value).toEqual(call(loadMovies));
    expect(generator.next(mockData).value).toEqual(put(ActionCreator.moviesLoaded(mockData)));
  });

  it(`Test fail load all movies`, () => {
    const generator = workerLoadMovies();
    const mockError = `error text`;
    expect(generator.next().value).toEqual(call(loadMovies));
    expect(generator.throw(new Error(mockError)).value).toEqual(put(ActionCreator.moviesLoadingError(mockError)));
  });

  it(`Test success promo movie`, () => {
    const generator = workerLoadPromo();
    const mockData: Movie = {
      name: '',
      posterImage: '',
      previewImage: '',
      backgroundImage: '',
      description: '',
      rating: 0,
      scoresCount: 0,
      director: '',
      starring: [],
      runTime: 0,
      genre: '',
      released: 0,
      id: 0,
      isFavorite: false,
      videoLink: '',
      previewVideoLink: '',
    };
    expect(generator.next().value).toEqual(call(loadPromo));
    expect(generator.next(mockData).value).toEqual(put(ActionCreator.promoLoaded(mockData)));
  });

  it(`Test fail load promo movie`, () => {
    const generator = workerLoadPromo();
    const mockError = `error text`;
    expect(generator.next().value).toEqual(call(loadPromo));
    expect(generator.throw(new Error(mockError)).value).toEqual(put(ActionCreator.promoLoadingError(mockError)));
  });
});
