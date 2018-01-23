import {ActivityIndicator} from 'antd-mobile';

export default class  extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    position: PropTypes.string,
  };
  state = {
    animating: false
  };

  static defaultProps = {
    source: '',
    position: 'middle'

  };

  componentWillMount() {

  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  _playVideo() {
    this.setState({animating: !this.state.animating});
    const {source} = this.props;
    document.getElementById('dcSource').src = source;
    document.getElementById('dcVideo').load();
    document.getElementById('dcVideo').play();
    this.closeTimer = setTimeout(() => {
      this.setState({animating: !this.state.animating});
    }, 2000);
  }

  render() {
    const {className} = this.props;
    const {animating} = this.state;

    return (
      <div className={classNames('react-video-container', className)}>
        <video id="dcVideo" className="dc-video" preload="auto" controls="controls">
          <source id="dcSource" src="" type="video/mp4"/>
        </video>
        {
          <ActivityIndicator
            toast
            text="Loading..."
            animating={animating}
          />
        }

      </div>

    )
  }
}
