import './index.scss'
import {Link} from 'react-router-dom';
import {Carousel} from 'antd-mobile';
import AppBase, {RA,MyVideo, CardItem, MyItem, MyRealTime, $api, $app, $items, $wechat} from 'components/scripts/index';
import banner1 from '../../assets/images/banner/banner-1.jpg'
import banner2 from '../../assets/images/banner/banner-2.jpg'

export default class extends AppBase {
  state = {
    lists: [],
    tipList: [],
    cardList: [],
    videoUrl: 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_video/market_video.mp4'
  };

  componentWillMount() {
    this.init();
  }

  init() {

    this._banners().then(res => {
      let _lists = res.data.list;
      /* this.setState({
         lists: _lists
       });*/

    });
    this._choices().then(res => {
      this.setState({
        cardList: res.data
      })
    });
    this._real_time().then(res => {
      this.setState({
        tipList: res.data
      })
    });
  }

  _banners() {
    return $api.banners('get');
  }

  _real_time() {
    return $api.projects('get', '', 'real_time');
  }

  _choices() {
    return $api.projects('get', '', 'choices');
  }

  componentDidMount() {
    $wechat.updateTitle('主页-逻辑分享家');
    $wechat.settingShare();
  }

  _openMp4() {
    this.refs.rv._playVideo();
  }

  render() {
    const {lists, videoUrl, tipList, cardList} = this.state;
    return (
      <section className="home-index">
        <div className="hd">
          <Carousel autoplay={true} infinite>
            <Link to="/home/banner">
              <RA url={banner1} size={{width: '7.5rem', height: '4rem'}} radius="0"/>
            </Link>
            <div onClick={this._openMp4.bind(this)}>
              <RA url={banner2} size={{width: '7.5rem', height: '4rem'}} radius="0"/>
            </div>
          </Carousel>
          <MyVideo ref="rv" className="wp-full" source={videoUrl}/>
        </div>
        <div className="bd">
          <MyItem/>
          <div className="bd-two bg-f5">
            <div className="row row-center row-no-padding wp-auto">
              <div className="left">
                <button className="button button-tip f13 bold c-f">实时动态</button>
              </div>
              <div className="center col">
                {
                  tipList && tipList.length > 0 && <MyRealTime lists={tipList}/>
                }
              </div>
            </div>
          </div>


          <div className="bd-three bg-f">
            <div className="row row-center row-no-padding wp-auto row-title">
              <div className="col tl f15 bold c-37">精选软装案例</div>
              <div className="col tr">
                <Link to="/dome/list">
                  <span className="c-b5 f11">更多</span>
                  <i className="iconfont wx-arrow-left c-b5 f10"/>
                </Link>
              </div>
            </div>
            <div className="content">
              {
                cardList.map((item, index) => {
                  return (
                    <Link to={'/dome/detail/' + item.id} key={index}>
                      <CardItem item={item}/>
                    </Link>
                  )
                })
              }

            </div>
          </div>
        </div>
      </section>
    )
  }
}
