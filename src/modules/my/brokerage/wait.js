import './index.scss';
import AppBase, {MyPhone, EmptyPage, MyBrokerageTitle, $app, $api, $wechat} from "components/scripts/index";

export default class extends AppBase {
  state = {
    detail: {
      balanceNow: 0,
      balanceWait: 0,
      waitLists: []
    },
    empty: false
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._commission().then(res => {
      this.setState({
        detail: res.data,
        empty: res.data&&res.data.waitCommissionRecords.length===0
      })
    });

  }

  _commission() {
    return $api.commission('get', '', 'info');
  }

  componentDidMount() {
    $wechat.updateTitle('待结佣-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {detail, empty} = this.state;
    console.log(empty);
    return (
      <section className="my-brokerage-wait wp-bgf">
        <div className="hd wp-auto-p bg-f">
          <div className="f14 c-37 mt10">待结算金额：</div>
          <div className="f30 c-da mt15 bold">{$app.toDecimal(detail.waitCommission)}</div>
          <div className="f12 c-37 mt10">今日到账{$app.toPrice(detail.todayCommission)}元</div>
        </div>
        <div className="line-d-1"/>
        <div className="bd">
          {empty && <EmptyPage/>}
          {
            !empty && <div className="wp-auto">
              <div className="bd-two mt15 ">
                <MyBrokerageTitle>待结佣记录</MyBrokerageTitle>
                <div className="mt20">
                  {
                    detail.waitCommissionRecords && detail.waitCommissionRecords.map((item, index) => {
                      return (<div key={index} className="item mb10">
                        <MyPhone className="time c-37">{$app.toDate(item.statusTime)}</MyPhone>
                        <span className="f15 c-37 ml10">{item.projectName}项目结佣<span
                          className="c-da f15">{$app.toPrice(item.commission)}</span>元</span>
                      </div>)
                    })
                  }
                </div>

              </div>
            </div>
          }
        </div>
      </section>
    )
  }
}
