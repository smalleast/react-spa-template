import './index.scss';
import {Link} from 'react-router-dom';
import AppBase, {MyPhone, $api, $app, $store, $wechat} from "components/scripts/index";
import {Modal} from 'antd-mobile';
import BrokerageLog from './brokerage-log';

let alert = Modal.alert;
let alertInstance;
export default class extends AppBase {
  state = {
    detail: {}
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._commission().then(res => {
      this.setState({
        detail: res.data
      })
    });

  }

  _commission() {
    return $api.commission('get', '', 'info');
  }


  _onClick(inItem) {
    this._bank_card_info().then(res => {
      if (res.data.length === 0) {
        alertInstance = alert('', '您的账户未绑定储蓄卡，暂时无法提现，请前往绑定之后再做提现操作',
          [{
            text: '前往绑定',
            onPress: () => {
              this.props.history.push('/my/bank/add');
            }
          }]
        );
      } else {
        this.props.history.push('/my/brokerage/withdraw/all');
      }
    });
  }

  _bank_card_info() {
    return $api.user('get', '', 'bank_card_info');
  }

  componentDidMount() {
    $wechat.updateTitle('佣金-逻辑分享家');
    $wechat.settingShare();
  }

  componentWillUnmount() {
    //todo 页面组件卸载时调用
    if (typeof alertInstance === 'object') {
      alertInstance.close();
    }
  }

  render() {
    const {detail} = this.state;
    return (
      <section className="my-brokerage">
        <div className="hd wp-auto-p bg-da">
          <div className="f14 c-f mt10">结佣金额：</div>
          <div className="f30 c-f mt15 bold">{$app.toDecimal(detail.checkoutCommission||0)}</div>
          <div className="f12 c-f mt10">今日到账{$app.toPrice(detail.todayCommission||0)}元</div>
        </div>
        <div className="bd">
          <div className="bd-one row row-center row-no-padding bg-f wp-auto-p">
            <div className="col left tl">
              <span className="f15 c-black"> 待结算佣金：</span><span
              className="f15 c-da">{$app.toPrice(detail.waitCommission||0)}元</span>
            </div>
            <div className="right tr">
              <Link to="/my/brokerage/wait">
                <span className="c-37 f11">查看详情 </span>
                <i className="iconfont wx-arrow-left c-b5 f10"/>
              </Link>
            </div>
          </div>
          <BrokerageLog lists={detail.checkoutCommissionRecords} withdrawLists={detail.withdrawalsRecords}/>
        </div>
        <article className="fd wp-fd fixed bg-f">
          <button className="button button-primary" onClick={this._onClick.bind(this, 1)}>提现</button>
        </article>
      </section>
    )
  }
}
