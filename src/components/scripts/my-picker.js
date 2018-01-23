import {Picker} from 'antd-mobile'

export default class extends React.PureComponent {
  state = {
    pickerValue: []
  };
  static defaultProps = {
    extra: '选择'
  };

  _onOk(inItem) {
    const {onSelect, lists} = this.props;
    this.setState({
      pickerValue: inItem
    }, () => {
      let inId = lists.filter(item => {
        if (item.label === inItem[0]) {
          return item.id
        }
      })[0];
      onSelect(inId);
    })
  }

  render() {
    const {lists, children, className, extra} = this.props;
    const {pickerValue} = this.state;
    const CustomChildren = props => (
      <div onClick={props.onClick}>
        <div className="row row-center row-no-padding wp-item wp-auto wp-10">
          <div className="left tl f15">{props.children}</div>
          <div className="right col tr f14">{props.extra}<i className="iconfont wx-arrow-left ml5 mr5"/></div>
        </div>
      </div>
    );
    return (
      <span className={classNames('my-picker', className)}>
        <Picker data={lists} cols={1} title={children} extra={extra}
                value={pickerValue}
                onChange={v => this.setState({pickerValue: v})}
                onOk={this._onOk.bind(this)}>
            <CustomChildren>{children}：</CustomChildren>
          </Picker>
      </span>
    )

  }
}
