import './index.scss'
import {DomeCardItem, $api, $app, ListBase, $wechat} from 'components/scripts/index'

export default class extends ListBase {
  _className() {
    this.setState({
      className: 'my-message bg-f',
      bdAuto: false
    })
  }

  fetchList(pageSize, pageNum) {
    return $api.messages('get', {
      pageSize: pageSize,
      pageNum: pageNum
    });
  }

  _topView() {


  }

  _itemView(item, index) {
    return <div className="bd-item" key={index}>
      <p className="bd-item-content f15 c-37">{item.content}</p>
      <div className="bd-item-time f13 c-b5 mt5">{$app.toDateTime(item.createTime)}</div>
    </div>
  }

  componentDidMount() {
    $wechat.updateTitle('消息-逻辑分享家');
    $wechat.settingShare();
  }
}



