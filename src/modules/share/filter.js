import {Modal, Toast, Tabs} from 'antd-mobile';
import {$api, $items} from 'components/scripts/index';

export default class extends React.PureComponent {
  state = {
    hasSx: false,
    tabs: [],
    currentItems: []
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._style_type().then(res => {
      this.setState({
        tabs: res.data
      })
    })
  }

  _style_type() {
    return $api.dictionaries('get', 'style_type');
  }

  componentWillReceiveProps(nextProps, nextStates) {
    this.setState({
      hasSx: nextProps.visible || false
    });
  }

  _onClose() {
    const {onSearch} = this.props;
    const {currentItems} = this.state;
    onSearch(currentItems);
  };

  _onSxItem(inItem) {
    const {tabs, currentItems} = this.state;
    if (currentItems.length === 3) {
      Toast.info('风格喜好最多选择3个');
    } else {
      let newTabs = tabs.filter(item => {
        if (item.id === inItem.id) {
          if (inItem.active) {
            item.active = false;
          } else {
            item.active = true;
          }
        }
        return item;
      });
      let newCurrentTabs = newTabs.filter(item => item.active);
      this.setState({
        currentItems: newCurrentTabs
      });
      this.setState({
        tabs: newTabs
      });
    }


  }

  _onCancel() {
    const {tabs} = this.state;
    let newTabs = tabs.filter(item => {
      item.active = false;
      return item;
    });
    this.setState({
      tabs: newTabs,
      currentItems: []
    })
  }

  _onSubmit() {
    this._onClose();
  }

  render() {
    const {hasSx, tabs, currentItems} = this.state;
    return (
      <Modal popup visible={hasSx} onClose={this._onClose.bind(this)} animationType="slide-up">
        <div className="hd f15 c-37">风格喜好</div>
        <div className="bd dib pb15 pt15 pl7">
          {
            tabs.map((item, index) => {
              return (
                <div key={index} onClick={this._onSxItem.bind(this, item)}
                     className={classNames('bd-list-item f14 c-9', item.active ? 'active' : '')}>
                  {item.label}
                </div>)
            })
          }
        </div>
        <div className="line-d-1"/>
        <div className="fd pt15 pb15">
          <button className="button button-cannel" onClick={this._onCancel.bind(this)}>重置</button>
          <button className="button button-submit ml15" onClick={this._onSubmit.bind(this)}>确定</button>
        </div>
      </Modal>
    )
  }
}
