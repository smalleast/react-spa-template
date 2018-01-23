import {DomeCardItem, $api, ListBase,$wechat} from 'components/scripts/index'
import {Link} from 'react-router-dom';

export default class extends ListBase {
  _className() {
    this.setState({
      className: 'bg-f5'
    })
  }
  fetchList(pageSize, pageNum) {
    return $api.projects('get', {
      pageSize: pageSize,
      pageNum: pageNum
    });
  }

  _itemView(item, index) {
    return <Link to={'/dome/detail/' + item.id} key={index}>
      <DomeCardItem item={item}/>
    </Link>
  }
  componentDidMount() {
    $wechat.updateTitle('案例-逻辑分享家');
    $wechat.settingShare();
  }
}
