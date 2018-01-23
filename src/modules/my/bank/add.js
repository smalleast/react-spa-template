import './index.scss'
import AppBase, {MyRadio, MyProtocol, MyInput, $store, $app, $api,$wechat} from 'components/scripts/index';


export default class extends AppBase {


  state = {
    hasOk: true,
    name: '',
    identity: '',
    card: '',
    branch: '',
    phone: ''
  };

  _onProtocol(val) {
    this.setState({
      hasOk: !val
    }, () => {
      this._verification();
    })
  }

  _onSubmit() {
    this._validate_card().then(res => {
      return this._binding_bank_card();
    }).then(res => {
      setTimeout(() => {
          this.props.history.goBack();
        },
        1000)
    });
  }

  _binding_bank_card() {
    const {name, identity, card, branch, phone} = this.state;
    return $api.user('post', {
      branchName: branch,
      cardNum: $app.trim(card),
      cardholderName: name,
      identityNum: identity,
      reserveMobilePhone: $app.trim(phone)
    }, 'binding_bank_card');
  }

  _validate_card() {
    const {card} = this.state;
    return $api.user('get', {cardNo: $app.trim(card)}, 'validate_card');
  }


  componentDidMount() {
    $wechat.updateTitle('绑定银行卡-逻辑分享家');
    $wechat.settingShare();
  }
  componentWillUnmount() {
    //todo 页面组件卸载时调用
  }

  render() {
    const { hasOk} = this.state;
    return (
      <section className="my-b-add wp-bgef">
        <article className="hd bg-primary c-f tc f12">
          <div className="hd-tip f13">温馨提示：为了避免您无法正常接收佣金，请提供真实完整资料</div>
        </article>
        <article className="bd">
          <MyInput title="持卡人姓名：" placeholder="请输入持卡人姓名" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'name')}/>
          <MyInput title="身份证号：" placeholder="请输入身份证号" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'identity')}/>
          <MyInput type="bankCard" title="卡号：" placeholder="请输入卡号" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'card')}/>
          <MyInput title="开户支行：" placeholder="请输入开户支行名称" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'branch')}/>
          <div className="mt10 bg-f5"/>
          <MyInput title="预留手机：" placeholder="请输入预留手机号" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'phone')}/>
          <div className="wp-auto f13 c-b5 lh20 mt20">
            温馨提示：仅支持绑定银行卡，不能绑定信用卡和存折。银行卡用于发放佣金，请确保输入信息真实有效
          </div>
        </article>
        <article className="fd wp-fd bottom bg-f5">
          <div className="mt20"><MyRadio active={hasOk} onClick={this._onProtocol.bind(this, hasOk)}/><span
            className="f13 c-37 ml10">同意</span> <MyProtocol/></div>
          <button className="button button-primary" onClick={this._onSubmit.bind(this)}>提交
          </button>
        </article>

      </section>
    )
  }
}
