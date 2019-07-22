import * as React from 'react';
import {Movie} from '../../types';

import VideoPlayer from '../../components/video-player/video-player';

interface IProps {
  movie: Movie,
}

interface IState {
  showPlayer: boolean
}

class PlayButton extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {showPlayer: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: React.ReactElement<any>) =>
      React.cloneElement(child, { onClick: this.handleClick})
    );

    return <>
      {childrenWithProps}
      {this.state.showPlayer && <VideoPlayer
        movie={this.props.movie}
        onExit={this.handleExit}
      />}
    </>;
  }

  handleClick() {
    this.setState({showPlayer: true});
  }

  handleExit() {
    this.setState({showPlayer: false});
  }
}

export default PlayButton;
