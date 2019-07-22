import * as React from 'react';
import {connect} from 'react-redux';

import {ActionCreator as CommentsActionCreator} from '../../reducers/comments/actions';
import {MovieComments as IMovieComments} from '../../types';
import {makeGetMovieComments} from '../../reducers/comments/selectors';
import Comment from '../comment/comment';
import {format} from "date-fns";

interface Props {
  movieId: number,
  commentsData: IMovieComments,
  loadComments: (movieId: number) => void,
}

class MovieComments extends React.PureComponent<Props, null> {

  componentDidMount() {
    const {movieId, loadComments} = this.props;
    loadComments(movieId);
  }

  render() {
    const {commentsData} = this.props;
    const {loading, loaded, comments} = commentsData;

    if (!Array.isArray(comments) || !comments.length) {
      return <div className="movie-card__reviews movie-card__row">
        <p>No reviews. You can be the first!</p>
      </div>;
    }

    const oddComments = [];
    const evenComments = [];

    for (let i = 0; i < comments.length; i++) {
      if (i % 2) {
        oddComments.push(comments[i]);
      } else {
        evenComments.push(comments[i]);
      }
    }

    return <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {evenComments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
      </div>
      <div className="movie-card__reviews-col">
        {oddComments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
      </div>
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  commentsData: makeGetMovieComments()(state, ownProps.movieId)
});

const mapDispatchToProps = (dispatch) => ({
  loadComments: (movieId: number) => dispatch(CommentsActionCreator.loadComments(movieId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieComments);
