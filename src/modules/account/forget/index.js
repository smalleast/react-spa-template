import '../index.scss'
import AppBase, {MyInput,MyCaptcha,MyPassword,$api,$app,$wechat} from 'components/scripts/index';
import AccountTop from '../top';

export default class extends AppBase {
  state = {
    hasCaptcha:true,
    phone: '',
    code: '',
    pass: ''
  };

  _verification() {
    const { phone} = this.state;
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
    this._reset_password().then(res=>{
      this.props.history.goBack();
    })
  }
  _reset_password(){
    const {phone,code,pass}=this.state;
    return $api.user('post',{
      mobilePhone:$app.trim(phone),
      password:pass,
      verificationCode:code
    },'reset_password');
  }
  componentDidMount() {
    $wechat.updateTitle('忘记密码-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const { phone, hasCaptcha} = this.state;
    return (
      <section className="account-login wp-bgf">
        <AccountTop/>
        <div className="bd wp-auto">
          <div className="f13 c-37 bold mt20">手机号</div>
          <MyInput type="phone" placeholder="请输入手机号" className="f18"
                   onChange={this.inputChange.bind(this, 'phone', this._verification.bind(this))}/>
          <div className="f13 c-37 bold mt20">验证码</div>
          <MyInput extra={true} placeholder="输入验证码" className="f18"
                   onChange={this.inputChange.bind(this, 'code')}>
            <MyCaptcha disabled={hasCaptcha} phone={phone} type="2"/>
          </MyInput>
          <MyPassword tip="设置新密码" placeholder="请输入6至20位密码"
                      onChange={this.inputChange.bind(this, 'pass')}/>
        </div>
        <div className="fd mt10">
          <button className="button button-primary"  onClick={this._onSubmit.bind(this)}>提交
          </button>
        </div>
      </section>
    )
  }
}
