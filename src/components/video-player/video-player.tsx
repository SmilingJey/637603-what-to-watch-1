import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Movie} from '../../types';

interface IProps {
  movie: Movie,
  onExit: () => void,
}

interface IState {
  isPlaying: boolean,
  duration: number,
  currentTime: number,
}

class VideoPlayer extends React.PureComponent<IProps, IState> {
  private videoContainer: HTMLDivElement;
  private videoRef: React.RefObject<HTMLVideoElement>;
  private progressRef: React.RefObject<HTMLProgressElement>;

  constructor(props: IProps) {
    super(props);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    this.handleProgressClick = this.handleProgressClick.bind(this);
    this.state = {
      isPlaying: true,
      duration: 0,
      currentTime: 0
    };
    this.videoContainer = document.createElement('div');
    this.videoRef = React.createRef();
    this.progressRef = React.createRef();
  }

  componentDidMount() {
    document.body.appendChild(this.videoContainer);
    const video = this.videoRef.current;
    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.onpause = () => this.setState({
      isPlaying: false,
    });

    video.ondurationchange = () => this.setState({
      duration: video.duration,
    });

    video.ontimeupdate = () => this.setState({
      currentTime: Math.round((video.currentTime * 10) / 10),
    });
  }

  componentWillUnmount() {
    const video = this.videoRef.current;
    video.onplay = null;
    video.onpause = null;
    video.ondurationchange = null;
    video.ontimeupdate = null;
    document.body.removeChild(this.videoContainer);
  }

  componentDidUpdate() {
    const video = this.videoRef.current;
    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const {movie, onExit} = this.props;
    const {isPlaying} = this.state;
    return ReactDOM.createPortal(<div className="player-container">
      <div className="player">
        <video src={movie.videoLink} className="player__video"
               poster={movie.previewImage} ref={this.videoRef} autoPlay />
        <button type="button" className="player__exit" onClick={onExit}>Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={this.getPosition()} max="100"
                        ref={this.progressRef} onClick={this.handleProgressClick}/>
              <div className="player__toggler" style={{left: this.getPosition() + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{this.getDurationText()}</div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={this.handlePlayClick}>
              {!isPlaying ? <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
                </> :
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"/>
                  </svg>
                  <span>Pause</span>
                </>
              }
            </button>
            <div className="player__name">{movie.name}</div>
            <button type="button" className="player__full-screen" onClick={this.handleFullScreenClick}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>, this.videoContainer);
  }

  handleProgressClick(evt) {
    const x = evt.clientX -  this.progressRef.current.offsetLeft;
    const position = x / this.progressRef.current.offsetWidth;
    const video = this.videoRef.current;
    video.currentTime = position * this.state.duration;
    console.log(position);
  }

  handlePlayClick() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  handleFullScreenClick() {
    this.openFullscreen(this.videoRef.current);
  }

  getDurationText() {
    const {duration} = this.state;
    const h = Math.floor(duration / 3600).toString();
    const m = Math.floor(duration % 3600 / 60).toString();
    const s = Math.floor(duration % 3600 % 60).toString();
    return `${h}:${m.padStart(2, `0`)}:${s.padStart(2, `0`)}`;
  }

  getPosition() {
    const {currentTime, duration} = this.state;
    if (!duration) {
      return 0;
    }
    return currentTime / duration * 100;
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
}

export default VideoPlayer;
