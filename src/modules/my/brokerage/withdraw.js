import './index.scss';
import {Link} from 'react-router-dom';
import AppBase, {$api, $app, MyInput, RSM, $wechat} from 'components/scripts/index';
import {InputItem, Modal} from 'antd-mobile';

let alert = Modal.alert;
export default class extends AppBase {
  state = {
    money: undefined,
    moneyNow: 0,
    bank: {}
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._bank_card_info().then(res => {
      let bankId = this.props.match.params.id;
      let lists = res.data;
      let _bank = lists.filter(item => item.id === parseInt(bankId))[0];
      this.setState({
        bank: _bank || res.data[0]
      });
      return this._commissionInfo();
    }).then(res => {
      this.setState({
        moneyNow: res.data.checkoutCommission
      })
    });

  }

  _bank_card_info() {
    return $api.user('get', '', 'bank_card_info');
  }

  _commissionInfo() {
    return $api.commission('get', '', 'info');
  }

  _commission() {
    const {bank, money} = this.state;
    return $api.commission('post', {
      userBankId: bank.id,
      money: parseFloat(money || 0)
    }, 'withdrawals');
  }

  _onSubmit() {
    this._commission().then(res => {
      if (res.data.id) {
        this.props.history.replace('/my/brokerage/success/' + res.data.id + '');
      }
    })
  }

  _allPrice() {
    const {moneyNow} = this.state;
    this.setState({
      money: moneyNow + ''
    })
  }

  _verification() {
    const {money} = this.state;
    this.setState({
      money: this._normalize(money)
    })
  }

  _normalize(inValue) {
    if (/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(inValue)) {
      console.log('有效');
      return inValue;
    } else {
      if (inValue.length === 1 && inValue === '.') {
        return '0.';
      } else {
        return inValue.substring(0, inValue.length - 1);
      }
    }
    return inValue
  }

  componentDidMount() {
    $wechat.updateTitle('提现-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {bank, moneyNow, money} = this.state;
    console.log('money:', money);
    return (
      <section className="my-info-phone pt15 wp-bgef">
        <div className="hd mb15 wp-auto-p bg-f">
          <Link replace={true} to="/my/brokerage/withdraw-select">
            <div className="row row-center">
              <div className="left mr10">
                <RSM status={bank.bankCode} statusList={['default', 'CCB', 'CMB', 'ICBC', 'COMM', 'BOC', 'CEB', 'CIB']}>
                  <i className="iconfont wx-qitayinhang bank bank-1"/>
                  <i className="iconfont wx-jiansheyinhang bank bank-1" data-text='CCB'/>
                  <i className="iconfont wx-zhaoshang bank bank-1" data-text='CMB'/>
                  <i className="iconfont wx-gongshangyinhang bank bank-1" data-text='ICBC'/>
                  <i className="iconfont wx-jiaotong bank bank-1" data-text='COMM'/>
                  <i className="iconfont wx-zhongguo bank bank-1" data-text='BOC'/>
                  <i className="iconfont wx-guangdayinhang bank bank-1" data-text='CEB'/>
                  <i className="iconfont wx-xingyeyinhang bank bank-1" data-text='CIB'/>
                </RSM>
              </div>
              <div className="col">
                <output className="db bank-text-blue f16">{bank.bankName}</output>
                <output className="db mt5 f14 c-7">储蓄卡</output>
              </div>
              <div className="right">
                <i className="iconfont wx-arrow-left"/>
              </div>
            </div>
          </Link>
        </div>
        <div className="bd bg-f pt20 pb20">
          <div className="f14 c-37 ml15">提现金额：</div>
          <div className="mt5 mb5">
            <InputItem type='money' placeholder="0.00" value={money} clear moneyKeyboardAlign="left"
                       onChange={this.inputChange.bind(this, 'money', this._verification.bind(this))}
                       onBlur={this.inputChange.bind(this, 'money', this._verification.bind(this))}><span
              className="c-37 f30 bold ml15">¥</span></InputItem>
          </div>
          <div className="row row-center row-no-padding wp-auto">
            <div className="col tl f12 c-37">可用余额 {$app.toPrice(moneyNow)} 元</div>
            <div className="col tr c-da f12" onClick={this._allPrice.bind(this)}>全部提现</div>
          </div>
        </div>
        <article className="fd">
          <button className="button button-primary" onClick={this._onSubmit.bind(this)}>提现</button>
        </article>

      </section>
    )
  }
}
