import AppBase from './app-base';
import EmptyPage from './empty-page';

import {PullToRefresh} from 'antd-mobile';

export default class extends AppBase {
  state = {
    pageSize: 10,
    pageNum: 1,
    className: '',
    bdClassName: 'wp-auto',
    detail: {},
    lists: [],
    empty: true,
    emptyText:'',
    height: document.documentElement.clientHeight - 50
  };


  componentWillMount() {
    this.init();
  }


  init() {
    this._loadMore();
    this._className();
  }

  _className() {

  }

  _loadMore() {
    const {pageSize, pageNum, lists} = this.state;
    this.fetchList(pageSize, pageNum).then(res => {
      if (pageNum <= res.data.total) {
        this.setState({
          lists: lists.concat(res.data.list),
          detail: res.data,
          empty: res.data.total === 0
        })
      }
      setTimeout(() => {
        this.setState({refreshing: false});
      }, 0)
    });
  }

  _searchLoadMore() {
    this.setState({
      pageNum: 1,
      lists: [],
      empty: true
    }, () => {
      this._loadMore();
    });
  }

  _onRefresh() {
    const {pageNum, detail} = this.state;
    if (pageNum < detail.pages) {
      this.setState({
        refreshing: true,
        pageNum: pageNum + 1
      }, () => {
        this._loadMore();
      });
    }
  }

  fetchList(pageSize, pageNum) {

  }

  _topView() {

  }

  _itemView(item, index) {

  }

  render() {
    const {lists, empty, className, bdClassName, detail,emptyText} = this.state;
    return (
      <section className={classNames('list-base', className)}>
        {this._topView()}
        {empty && <EmptyPage>{emptyText}</EmptyPage>}
        {!empty && <div className={classNames('bd list-base-bd', bdClassName)}>
          {
            lists && detail.pages < 2 && lists.map((item, index) => {
              return this._itemView(item, index);
            })
          }
          {
            lists && detail.pages > 1 && <PullToRefresh ref={el => this.ptr = el}
                                                        style={{
                                                          height: this.state.height,
                                                          overflow: 'auto',
                                                        }}
                                                        indicator={{
                                                          deactivate: '上拉可以刷新', activate: '松开立即刷新'
                                                        }}
                                                        distanceToRefresh={25}
                                                        direction='up'
                                                        refreshing={false}
                                                        onRefresh={this._onRefresh.bind(this)}>
              {
                lists && lists.map((item, index) => {
                  return this._itemView(item, index);
                })
              }
              <div className="blank-30"/>
            </PullToRefresh>
          }

        </div>}

      </section>
    )
  }
}
