import '../index.scss'
import {Link} from 'react-router-dom';
import AppBase, {MyInput, MyPassword, $store, $app, $api,$wechat} from 'components/scripts/index';
import {Toast} from 'antd-mobile';
import AccountTop from '../top';
import Follow from '../follow';

export default class extends AppBase {
  state = {
    phone: '',
    pass: '',
    qrCode: 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_icon/zhulogic_share_qrcode.jpg'
  };


  _onSubmit() {
    this._login().then(res => {
      if (res.data && res.data.accessToken) {
        $store.local = {
          token: res.data
        };
        return this._getInfo();
      } else {
        console.log('loginFail:', res);
        Toast.fail('登录异常，请联系客服')
      }
    }).then(res => {
      $store.local = {
        info: res.data
      };
      setTimeout(() => {
        this._goUrl();
      }, 1000);
    });
  }

  _login() {
    const {phone, pass} = this.state;
    return $api.user('post', {
      mobilePhone: $app.trim(phone),
      password: pass
    }, 'login');
  }


  _goUrl() {
    //this.props.history.replace('/home');
    this.refs.follow._onModal();
  }
  componentDidMount() {
    $wechat.updateTitle('登录-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {qrCode} =this.state;
    return (
      <section className="account-login wp-bgf">
        <AccountTop/>
        <div className="bd wp-auto">
          <div className="f13 c-37 bold">手机号</div>
          <MyInput type="phone" placeholder="请输入手机号" className="f18"
                   onChange={this.inputChange.bind(this, 'phone')}/>
          <MyPassword onChange={this.inputChange.bind(this, 'pass')}/>
        </div>
        <div className="fd mt10">
          <button className="button button-primary" onClick={this._onSubmit.bind(this)}>登录
          </button>
          <div className="row row-center fd-link">
            <Link replace={true} to="/register" className="col tr">
              <div className="left f13 c-da">注册账号</div>
            </Link>
            <div className="center c-df tc">|</div>
            <Link replace={false} to="/forget" className="col tl">
              <div className="right f13 c-da">忘记密码</div>
            </Link>
          </div>
        </div>
        <Follow ref="follow" qrCode={qrCode}/>
      </section>
    )
  }
}
