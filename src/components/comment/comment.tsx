import * as React from 'react';
import {UserComment} from '../../types';
import {format} from 'date-fns';

interface Props {
  comment: UserComment;
}

const Comment = (props: Props) => {
  const {comment} = props;
  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment.comment}</p>
      <footer className="review__details">
        <cite className="review__author">{comment.user.name}</cite>
        <time className="review__date" dateTime="2016-12-24">
          {format(new Date(comment.date), `MMMM DD, YYYY`)}
        </time>
      </footer>
    </blockquote>
    <div className="review__rating">{comment.rating.toFixed(1)}</div>
  </div>;
};

export default Comment;
