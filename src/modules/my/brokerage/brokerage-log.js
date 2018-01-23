import {Link} from 'react-router-dom';
import AppBase, {MyPhone, MyBrokerageTitle, EmptyPage, $app} from 'components/scripts/index';
import WithdrawDetail from './withdraw-detail';

export default class extends AppBase {
  state = {
    detail: {
      waitLists: [],
      lists: []
    },
    empty: false,
    hasModal: false,
    resultId: undefined
  };
  static defaultProps = {
    lists: [],
    withdrawLists: []
  };

  _onToggleModal(inId) {
    this.setState({
      hasModal: true,
      resultId: inId
    })
  }

  _onClose() {
    this.setState({
      hasModal: false
    })
  }

  componentWillMount() {
    this.init();
  }

  init() {
    const {lists, withdrawLists} = this.props;
    this.setState({
      empty: lists.length === 0 && withdrawLists.length === 0
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      empty: nextProps.lists.length === 0 && nextProps.withdrawLists.length === 0
    });
  }

  render() {
    const {resultId, empty, hasModal} = this.state;
    const {lists, withdrawLists} = this.props;
    console.log(empty, lists);
    return (
      <div>
        <div className="line-d-1 mb10"/>
        <MyBrokerageTitle>结佣记录</MyBrokerageTitle>
        {empty && <EmptyPage/>}
        {
          !empty && <div className="wp-auto">
            {
              withdrawLists && withdrawLists.length > 0 && <div className="bd-two mt15 ">
                <div className="f14 c-37 mb10 bold">已提现</div>
                {
                  withdrawLists && withdrawLists.map((item, index) => {
                    return (
                      <div key={index}
                           className={classNames('item mb10 row row-center', item.status === 3 ? 'item-fail' : '')}
                           onClick={this._onToggleModal.bind(this, item.id)}>
                        <div className="left">
                          <MyPhone className="time c-37 item-fail-text">{$app.toDate(item.statusTime)}</MyPhone>
                        </div>
                        <div className="center col">
                          <span className="f15 c-37 ml10 item-fail-text">提现<span
                            className="c-da f15 item-fail-text">{$app.toPrice(item.money || 0)}</span>元</span>
                        </div>
                        <div className="right"><i className="iconfont wx-arrow-left"/></div>
                      </div>)
                  })
                }
              </div>
            }
            {
              lists && lists.length > 0 && <div className="bd-three mt15">
                <div className="f14 c-37 mb10 bold">已结佣</div>
                {
                  lists && lists.map((item, index) => {
                    return (
                      <div key={index} className="item mb10">
                        <MyPhone className="time c-b5">2018-01-17</MyPhone>
                        <span className="f15 c-b5 ml10">{item.projectName}项目结佣{$app.toPrice(item.commission)}元</span>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        }
        <WithdrawDetail hasModal={hasModal} resultId={resultId} onClick={this._onClose.bind(this)}/>
        <div className="blank-20"/>
        <div className="blank-50"/>
      </div>
    )
  }
}
