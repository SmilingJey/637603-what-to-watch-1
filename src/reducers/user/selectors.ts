import NameSpace from '../name-spaces';

import {UserData} from '../../types';

export const getAuthorisationSubmitting = (state): boolean => state[NameSpace.USER].submitting;

export const getUserData = (state): UserData => state[NameSpace.USER].userData;

export const getAuthorisationError = (state): string => state[NameSpace.USER].authorizationError || ``;

export const getAuthorisationRequest = (state): boolean => state[NameSpace.USER].authorisationRequest;
