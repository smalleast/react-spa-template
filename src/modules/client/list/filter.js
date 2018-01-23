import {Modal, Tabs} from 'antd-mobile';
import {$api, $items} from 'components/scripts/index';

export default class extends React.PureComponent {
  state = {
    hasSx: false,
    tabs: [],
    currentItem: [{
      code: '',
      key: ''
    }, {
      code: '',
      key: ''
    }]
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._customer_status().then(res => {
      this.setState({
        tabs: res.data
      })
    })
  }

  _customer_status() {
    return $api.dictionaries('get', 'status');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasSx: nextProps.visible || false
    })
  }

  _onClose() {
    this.setState({
      hasSx: false
    })
  };

  _onSxItem(item) {
    const {onSearch} = this.props;
    this.setState({
      currentItem: item
    }, () => {
      this._onClose();
      onSearch(item);
    })
  }

  render() {
    const {hasSx, tabs, currentItem} = this.state;
    return (
      <Modal popup visible={hasSx} onClose={this._onClose.bind(this)} animationType="slide-up">
        <div className="hd f15 c-37">筛选记录</div>
        <div className="bd dib pt15 pb15 pl8">
          <div onClick={this._onSxItem.bind(this, {id: 0, label: '全部'})}
               className={classNames('bd-list-item f14 c-9', 0 === currentItem.id ? 'active' : '')}>
            全部
          </div>
          {
            tabs && tabs.map((item, index) => {
              return (
                <div key={index} onClick={this._onSxItem.bind(this, item)}
                     className={classNames('bd-list-item f14 c-9', item.label === currentItem.label ? 'active' : '')}>
                  {item.label}
                </div>)
            })
          }
        </div>
      </Modal>
    )
  }
}
