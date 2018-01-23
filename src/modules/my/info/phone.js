import './index.scss'
import AppBase, {MyInput,MyCaptcha,$api,$app,$store,$wechat} from 'components/scripts/index';

export default class extends AppBase {
  state = {
    phone: '',
    code: '',
    pass: '',
    hasDisabled: true,
    hasCaptcha: true
  };

  _verification() {
    const {code, pass, phone} = this.state;
    if (phone) {
      this.setState({
        hasCaptcha: false
      })
    } else {
      this.setState({
        hasCaptcha: true
      })
    }
    if (code && pass && phone) {
      this.setState({
        hasDisabled: false
      })
    } else {
      this.setState({
        hasDisabled: true
      })
    }
  }

  _onSubmit() {
    this._mobile_phone().then(res => {
      return this._getInfo();
    }).then(res => {
      $store.local = {
        info: res.data
      };
      this.props.history.replace('/my/info');
    })
  }

  _mobile_phone() {
    const {phone, code, pass} = this.state;
    return $api.user('put', {
      mobilePhone: $app.trim(phone),
      verificationCode: code,
      password: pass
    }, 'mobile_phone');
  }

  _sendCaptcha() {
    this._send_verification_code().then(res => {
      console.log(res);
    })
  }

  _send_verification_code() {
    const {phone} = this.state;
    return $api.user('post', {
      mobilePhone:$app.trim(phone),
      verificationCodeType: 2
    }, 'send_verification_code');
  }
  componentDidMount() {
    $wechat.updateTitle('修改手机号码-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {phone, code, pass, hasDisabled, hasCaptcha} = this.state;
    return (
      <section className="my-info-phone wp-bgf pt15 ">
        <div className="bd wp-auto">
          <MyInput title="新手机号" left={true} type="phone" placeholder="输入新手机号"
                   onChange={this.inputChange.bind(this, 'phone', this._verification.bind(this))}/>
          <MyInput title="短信验证码" left={true} extra={true}  placeholder="输入验证码"
                   onChange={this.inputChange.bind(this, 'code', this._verification.bind(this))}>
            <MyCaptcha disabled={hasCaptcha} phone={phone} type="2"/>
          </MyInput>
          <MyInput title="密码" left={true} type="password"  placeholder="输入密码"
                   onChange={this.inputChange.bind(this, 'pass', this._verification.bind(this))}/>
        </div>
        <article className="fd">
          <button className="button button-primary" disabled={hasDisabled} onClick={this._onSubmit.bind(this)}>提交
          </button>
        </article>
      </section>
    )
  }
}
