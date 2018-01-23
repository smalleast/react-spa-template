import MyInput from './my-input'

export default class extends React.PureComponent {
  state = {
    type: 'password',
    text: '显示'
  };
  static defaultProps = {
    placeholder: '请输入密码',
    tip: '密码'
  };

  _togglePass() {
    const {type} = this.state;
    if (type === 'password') {
      this.setState({
        type: 'text',
        text: '隐藏'
      })
    } else {
      this.setState({
        type: 'password',
        text: '显示'
      })
    }
  }

  render() {
    const {className, ...props} = this.props;
    const {type, text} = this.state;
    return (
      <div className="my-input bg-f">
        <div className="row row-center row-no-padding mt20">
          <div className="col tl f13 c-37 bold">密码</div>
          {
            <div className="col tr f13 c-da" onClick={this._togglePass.bind(this)}>{text}</div>
          }
        </div>
        <MyInput type={type} className={classNames('f18', className)} maxLength={20} {...props}/>
      </div>
    )

  }
}
