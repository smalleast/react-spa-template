import './index.scss'
import AppBase, {MyInput,$store,$api,$wechat} from 'components/scripts/index';

export default class extends AppBase {
  state = {
    oldPass: '',
    newPass: '',
    hasDisabled: true
  };

  _verification() {
    const {oldPass, newPass} = this.state;
    if (oldPass && newPass) {
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
    this._update_password().then(res => {
      return this._getInfo();
    }).then(res => {
      $store.local = {
        info: res.data
      };
      this.props.history.replace('/my/info')
    })
  }

  _update_password() {
    const {oldPass, newPass} = this.state;
    return $api.user('put', {
      oldPassword: oldPass,
      newPassword: newPass
    }, 'update_password');
  }
  componentDidMount() {
    $wechat.updateTitle('修改密码-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {oldPass, newPass, hasDisabled} = this.state;
    console.log(oldPass);
    return (
      <section className="my-info-phone wp-bgf pt15">
        <div className="bd wp-auto-p">
          <MyInput title="原密码" type="password" maxLength={20}  placeholder="请输入原密码"
                   onChange={this.inputChange.bind(this, 'oldPass', this._verification.bind(this))}/>
          <MyInput title="新密码" type="password" maxLength={20} placeholder="请输入6至20位密码"
                   onChange={this.inputChange.bind(this, 'newPass', this._verification.bind(this))}/>
        </div>
        <article className="fd">
          <button className="button button-primary" disabled={hasDisabled} onClick={this._onSubmit.bind(this)}>提交
          </button>
        </article>
      </section>
    )
  }
}
