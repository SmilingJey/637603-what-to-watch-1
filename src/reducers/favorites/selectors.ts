import NameSpace from '../name-spaces';
import {Movie} from '../../types';

export const getFavorites = (state): Movie[] => state[NameSpace.FAVORITES].favorites || [];
export const getLoading = (state): boolean => state[NameSpace.FAVORITES].loading;
export const getLoaded = (state): boolean => state[NameSpace.FAVORITES].loaded;
export const getLoadingError = (state): boolean => state[NameSpace.FAVORITES].loadingError;
