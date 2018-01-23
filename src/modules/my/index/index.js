import './index.scss';
import {Link} from 'react-router-dom';
import {Modal} from 'antd-mobile';
import AppBase, {RA, MyItem, MyTip, $store, $api, $app, $wechat} from 'components/scripts/index';

let alert = Modal.alert;
let alertInstance;
export default class extends AppBase {
  state = {
    logo: '',
    bank: {},
    count: 0
  };

  _onLogout() {
    alertInstance = alert('操作提示', '您确定要退出当前账号？', [
      {
        text: '否', onPress: () => {
          console.log('退出===否');
        }
      },
      {
        text: '是', onPress: () => {
          console.log('退出===是');
          $store.clear('token');
          $store.clear('info');
          this.props.history.push('/login')
        }
      }])
  }

  componentWillMount() {
    this.init();
  }

  init() {
    this._getInfo().then(res => {
      let _info = res.data;
      $store.local = {
        info: _info
      };
      if (_info.avatarFile) {
        this.setState({
          logo: $app.toImg(_info.avatarFile.key)
        })
      }
      return this._bank_card_info();
    }).then(res => {
      this.setState({
        bank: res.data[0]
      });
      return this._development_broker();
    }).then(res => {
      this.setState({
        count: res.data
      })
    })
  }

  _bank_card_info() {
    return $api.user('get', '', 'bank_card_info');
  }

  _development_broker() {
    return $api.development_broker('get', '', 'broker_count');
  }

  componentDidMount() {
    $wechat.updateTitle('我的-逻辑分享家');
    $wechat.settingShare();
  }

  componentWillUnmount() {
    //todo 页面组件卸载时调用
    if (typeof alertInstance === 'object') {
      alertInstance.close();
    }
  }

  render() {
    const {logo, bank, count} = this.state;
    const {info} = $store.local;
    return (
      <section className="my-index wp-bgef-y">
        <Link to="/my/info">
          <div className="hd bg-f">
            <div className="row row-center row-no-padding wp-auto">
              <div className="left">
                <RA url={logo || 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_icon/icon%20copy.png'}
                    size=".98rem"/>
              </div>
              <div className="center col">
                <output className="db f15 c-37 bold">{info.realName}</output>
                <output className="db mt10">
                  <div className="row row-center row-no-padding">
                    <span className="f13 c-37 mt2">{info.identityType === 1 ? '独立分享家' : '机构分享家'}</span>
                    <MyTip
                      className="bg-da dib ml5 radius">佣金{info.userRatio || 0}%</MyTip>
                  </div>
                </output>
              </div>
              <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
            </div>
          </div>
        </Link>
        <div className="bd mt10">
          <MyItem/>
          <div className="bd-two bg-f mt10">
            <Link to={"/my/recommend/index?count=" + count + "&id=" + info.id + ""}>
              <div className="row row-center row-no-padding wp-auto">
                <div className="left tl c-37 f15"><i className="iconfont wx-tuijian1  c-da mr5"/>发展分享家</div>
                <div className="center col tr">
                  <span className="f15 c-b5">{count}</span>
                </div>
                <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
              </div>
            </Link>
            <div className="line-d-1"/>
            <Link to="/my/bank/list">
              <div className="row row-center row-no-padding wp-auto">
                <div className="left tl c-37 f15"><i className="iconfont wx-bangdingyinhangqia c-da mr5"/>绑定银行卡</div>
                <div className="center col tr">
                  {
                    !bank && <span className="f15 c-b5">请绑定银行卡</span>
                  }
                </div>
                <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
              </div>
            </Link>
            <div className="line-d-1"/>
            <Link to="/my/about">
              <div className="row row-center row-no-padding wp-auto">
                <div className="left tl c-37 f15"><i className="iconfont wx-guanyuluojifenxiangjia c-da mr5"/>关于逻辑分享家
                </div>
                <div className="right col tr ml15">
                  <i className="iconfont wx-arrow-left"/>
                </div>
              </div>
            </Link>
            <div className="line-d-1"/>
          </div>
        </div>
        <div className="fd">
          <button className="button button-primary" onClick={this._onLogout.bind(this)}>退出登录</button>
        </div>

      </section>
    )
  }
}
