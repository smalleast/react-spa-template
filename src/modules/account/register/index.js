import '../index.scss'
import {Link} from 'react-router-dom';
import AppBase, {
  MyInput,
  MyProtocol,
  MyCaptcha,
  MyPassword,
  $api,
  $app,
  $store,
  $wechat
} from 'components/scripts/index';
import AccountTop from '../top';
import {Toast} from 'antd-mobile';
import Follow from '../follow';

export default class extends AppBase {
  state = {
    hasCaptcha: true,
    name: '',
    phone: '',
    code: '',
    pass: '',
    qrCode: 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_icon/zhulogic_share_qrcode.jpg'
  };

  _verification() {
    const {name, phone, code, pass} = this.state;
    if (phone) {
      this.setState({
        hasCaptcha: false
      })
    } else {
      this.setState({
        hasCaptcha: true
      })
    }

  }


  _onSubmit() {
    this._register().then(res => {
      Toast.success('注册成功', 1);
      this._login().then(res => {
        $store.local = {
          token: res.data
        };
        return this._getInfo();
      }).then(res => {
        $store.local = {
          info: res.data
        };
        this._goUrl();
      })

    });
    setTimeout(() => {
      this._goUrl();
    }, 1000);

  }

  _goUrl() {
    // this.props.history.replace('/home');
    this.refs.follow._onModal();
  }

  _register() {
    const {phone, code, pass} = this.state;
    let {mobilePhone} = nx.hashlize();
    return $api.user('post', {
      mobilePhone: $app.trim(phone),
      verificationCode: code,
      password: pass,
      identityType: 1,
      devMobilePhone: mobilePhone || ''
    }, 'register');
  }

  _login() {
    const {phone, pass} = this.state;
    return $api.user('post', {
      mobilePhone: $app.trim(phone),
      password: pass
    }, 'login');
  }

  componentWillMount() {

  }

  componentDidMount() {
    $wechat.updateTitle('注册-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {phone, hasCaptcha, qrCode} = this.state;
    return (
      <section className="account-login wp-bgf">
        <AccountTop/>
        <div className="bd wp-auto">
          <div className="f13 c-37 bold mt20">手机号</div>
          <MyInput type="phone" placeholder="请输入手机号" className="f18"
                   onChange={this.inputChange.bind(this, 'phone')}/>
          <div className="f13 c-37 bold mt20">验证码</div>
          <MyInput extra={true} placeholder="输入验证码" className="f18"
                   onChange={this.inputChange.bind(this, 'code')}>
            <MyCaptcha disabled={hasCaptcha} phone={phone} type="1"/>
          </MyInput>
          <MyPassword placeholder="请输入6至20位密码"
                      onChange={this.inputChange.bind(this, 'pass')}/>
          <div className="pt15">
            <span className="f13 c-b5">点击注册表示同意</span> <MyProtocol/>
          </div>
        </div>
        <div className="fd mt10">
          <button className="button button-primary" onClick={this._onSubmit.bind(this)}>注册
          </button>
        </div>
        <Follow ref="follow" qrCode={qrCode}/>
      </section>
    )
  }
}
