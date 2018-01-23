import {$api, RA, $app, MySteps, RSM} from 'components/scripts/index';

export default class extends React.PureComponent {

  state = {
    detail: {}
  };

  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps, nextStates) {
    this.init();
  }

  init() {
    this._commission().then(res => {
      this.setState({
        detail: res.data
      })
    })

  }

  _commission() {
    const {resultId} = this.props;
    return $api.commission('get', resultId, 'withdrawals');
  }

  render() {
    const {className} = this.props;
    const {detail} = this.state;
    return (
      <div className={classNames('result', className)}>
        {
          detail&&<MySteps hasPrice={true} status={detail.status}>
            <div className="tl">
              <span className="db c-green f17">提现申请已提交，等待处理</span>
              <span className="c-7 f13 db mt5">{detail.bankName}</span>
              <span className="c-7 f13 db mt5">{$app.toPrice(detail.money || 0)}元</span>
            </div>
            <RSM status={detail.status} statusList={[1, 2, 3]}>
              <div className="tl c-37 f17">预计2天内（12-30前）到账</div>
              <div className="tl c-green f17">到账成功</div>
              <div className="tl">
                <span className="db f17 c-da bold">提现失败</span>
                {
                  detail.remark && <span className="db f15 c-da mt8">提现失败原因：{detail.remark}</span>
                }
              </div>
            </RSM>
          </MySteps>
        }
      </div>
    )

  }
}
