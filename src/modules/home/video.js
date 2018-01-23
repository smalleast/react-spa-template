import './index.scss';
import AppBase, {MyVideo,$wechat} from "components/scripts/index";

export default class extends AppBase {
  state = {
    videoUrl: 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_video/%E5%88%86%E4%BA%AB%E5%AE%B6%E8%A7%86%E9%A2%91.mp4'
  };

  componentDidMount() {
    $wechat.updateTitle('逻辑分享家');
    $wechat.settingShare();
    this.refs.rv._playVideo();
  }

  render() {
    const {videoUrl} = this.state;
    return (
      <section className="home-video">
        <MyVideo ref="rv" className="wp-full" source={videoUrl}/>
      </section>
    )
  }
}
