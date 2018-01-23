import {Modal, Toast, Tabs} from 'antd-mobile';

export default class extends React.PureComponent {
  state = {
    hasSx: false,
    currentItems: []
  };
  static defaultProps = {
    title: '项目类型'
  };

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps, nextStates) {
    this.setState({
      hasSx: nextProps.visible || false,
    });
  }

  _onClose() {
    const {onChange} = this.props;
    const {currentItems} = this.state;
    onChange(currentItems);
  };

  _onSxItem(inItem) {
    this.setState({
      currentItems: inItem
    }, () => {
      this._onClose()
    });
  }


  render() {
    const {hasSx, tabs, currentItems} = this.state;
    const {title,lists} = this.props;
    return (
      <Modal popup visible={hasSx} onClose={this._onClose.bind(this)} animationType="slide-up">
        <div className="hd f15 c-37">{title}</div>
        <div className="bd dib pb15 pt15 pl7">
          {
            lists&&lists.map((item, index) => {
              return (
                <div key={index} onClick={this._onSxItem.bind(this, item)}
                     className={classNames('bd-list-item f14 c-9', item.label === currentItems.label ? 'active' : '')}>
                  {item.label}
                </div>)
            })
          }
        </div>
      </Modal>
    )
  }
}
