import {$api,$app} from 'components/scripts/index';

export default class extends React.PureComponent {
  state = {
    hasCaptcha:false,
    captchaText: '获取验证码'
  };
  static defaultProps = {
    disabled: false,
    phone: '',
    type: 2
  };



  _sendCaptcha() {
    this._send_verification_code().then(res => {
      this._countDown();
    })
  }

  _send_verification_code() {
    const {phone, type} = this.props;
    return $api.user('post', {
      mobilePhone:$app.trim(phone),
      verificationCodeType: type
    }, 'send_verification_code');
  }

  _countDown() {
    let num = 60;
    this.setState({
      captchaText: num-- + 's',
      hasCaptcha: true
    });
    let time = setInterval(() => {
      this.setState({
        captchaText: num-- + 's',
        hasCaptcha: true
      }, () => {
        if (num === 0) {
          this.setState({
            captchaText: '获取验证码',
            hasCaptcha: false
          });
          num = 10;
          clearInterval(time)
        }
      })
    }, 1000)
  }

  render() {
    const {captchaText, hasCaptcha} = this.state;
    return (
      <section className="my-captcha">
        <button className="button button-code f13" onClick={this._sendCaptcha.bind(this)}
                disabled={hasCaptcha}>{captchaText}
        </button>
      </section>
    )
  }
}
