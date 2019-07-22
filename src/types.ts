export interface Movie {
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  id: number,
  isFavorite: boolean,
  videoLink: string,
  previewVideoLink: string,
}

export interface UserData {
  id: number,
  email: string,
  name: string,
  avatarUrl: string,
}

export interface CommentsUserData {
  id: number,
  name: string,
}

export interface UserComment {
  id: number,
  user: CommentsUserData,
  rating: number,
  comment: string,
  date: string
}

export interface MovieComments {
  loading: boolean,
  loaded: boolean,
  loadingError: string,
  comments: UserComment[],
}
