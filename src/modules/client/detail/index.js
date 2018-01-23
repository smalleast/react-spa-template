import './index.scss';
import AppBase, {
  MyPhone,
  MyBrokerage,
  MyDetailTitle,
  MySteps,
  $api,
  $app,
  $items,
  $wechat
} from "components/scripts/index";

export default class extends AppBase {
  state = {
    detail: {}
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._customers().then(res => {
      this.setState({
        detail: res.data
      })
    });

  }

  _customers() {
    let id = this.props.match.params.id;
    let customerId = this.props.match.params.customerId;
    return $api.customers('get', id + '/' + customerId, 'projects');
  }

  componentDidMount() {
    $wechat.updateTitle('进度详情-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {detail} = this.state;
    return (
      <section className="client-detail bg-f">
        <div className="hd wp-auto tc">
          <div className="f21 c-37 mb15 bold">{detail.customerName}</div>
          <div className="mb10">
            <MyPhone className="lg">{detail.mobilePhone}</MyPhone>
          </div>
          <MyBrokerage commission={detail.commissionRatio}/>
          <div className="f11 c-7 mt10">推荐日期 {$app.toDate(detail.createTime)}</div>
        </div>
        <div className="bd wp-auto">
          <MyDetailTitle>推荐进度</MyDetailTitle>
          <div className="bd-content mt20">
            <MySteps>
              {
                detail.progress && detail.progress.map((item, index) => {
                  return (<div key={index}>
                    <span className="db f15 step-text c-b5 bold">{item.statusDisplay}</span>
                    <span className="db f16 step-remark c-b5 mt5">{item.remark}</span>
                    <span className="db f13 c-b5 mt5">{$app.toDateTime(item.createTime)}</span>
                  </div>)
                })
              }
            </MySteps>
          </div>
          {
            detail.remark && <div className="fd">
              <div className="f15 c-37 bold mt15 mb10">备注信息：</div>
              <div className="f15 c-37">{detail.remark}</div>
            </div>
          }

        </div>
      </section>
    )
  }
}
