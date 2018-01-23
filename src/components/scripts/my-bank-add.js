export default class extends React.PureComponent {


  render() {
    const {className} = this.props;
    return (
      <div className={classNames('my-bank-add', className)}>
        <span className="iconfont wx-add db c-b5 my-bank-add-icon tc"/>
        <div className="f14 c-7 mt10 my-bank-add-text tc">添加银行卡</div>
      </div>
    )

  }
}
