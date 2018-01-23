import './index.scss';
import {Link} from 'react-router-dom';
import {
  MyBrokerage,
  EmptyPage,
  MyTip,
  MyPhone,
  RSM,
  MySearch,
  ListBase,
  $api,
  $app,
  $wechat
} from "components/scripts/index";
import Filter from './filter';

export default class extends ListBase {

  state = {
    pageSize: 10,
    pageNum: 1,
    detail: {},
    lists: [],
    bdClassName: 'wp-auto',
    empty: true,
    emptyText:'还没有推荐哦',
    hasSx: false,
    keyword: '',
    status: 0,
    height: document.documentElement.clientHeight - 50
  };

  _className() {
    this.setState({
      className: 'client-list bg-f5 lb-top lb-bottom'
    })
  }

  _onSearch(key) {
    this.setState({
      hasSx: false,
      keyword: key
    }, () => {
      this._searchLoadMore();
    });
  }

  _onFilterSearch(inItem) {
    this.setState({
      hasSx: false,
      status: inItem.code
    }, () => {
      this._searchLoadMore();
    });
  }

  _openSx() {
    this.setState({
      hasSx: true
    })
  }

  fetchList(pageSize, pageNum) {
    const {keyword, status} = this.state;
    return $api.customers('get', {
      pageSize: pageSize,
      pageNum: pageNum,
      keyword: keyword,
      status: status
    }, 'projects');
  }

  _topView() {
    const {hasSx} = this.state;
    return <div className="list-base-hd bg-f">
      <div className="row row-center row-no-padding wp-auto">
        <div className="col left">
          <MySearch onClick={this._onSearch.bind(this)}/>
        </div>
        <div className="right" onClick={this._openSx.bind(this)}>
          <span className="f13 c-da">筛选</span><i className="iconfont wx-iconshaixuan c-da"/>
        </div>
      </div>
      <Filter visible={hasSx} onSearch={this._onFilterSearch.bind(this)}/>
    </div>
  }

  _itemView(item, index) {
    return <Link key={index} to={'/client/detail/' + (item.projectId || 0) + '/' + item.id + ''}>
      <div className="bd-item bg-f p15">
        <RSM status={item.status} statusList={[1, 2, 3, 4, 5, 6]}>
          <MyTip className="abs bg-da">待审核</MyTip>
          <MyTip className="abs bg-df">无效记录</MyTip>
          <MyTip className="abs bg-orange">沟通中</MyTip>
          <MyTip className="abs bg-df">推荐失败</MyTip>
          <MyTip className="abs bg-green">已签单</MyTip>
          <MyTip className="abs bg-green">已结佣</MyTip>
        </RSM>
        <div>
          <span className="f16 c-37 bold mr10">{item.customerName}</span><MyPhone
          className="sm">{item.mobilePhone}</MyPhone>
        </div>
        <div className="mt5 f14 c-7 mb15">{item.projectName || '暂未达成合作'}</div>
        <div className="row row-center row-no-padding">
          <div className="col"><MyBrokerage commission={item.commissionRatio}/></div>
          <div className="right f11 c-7">推荐日期 {$app.toDate(item.createTime)}</div>
        </div>
      </div>
    </Link>
  }

  componentDidMount() {
    $wechat.updateTitle('推荐记录-逻辑分享家');
    $wechat.settingShare();
  }
}
