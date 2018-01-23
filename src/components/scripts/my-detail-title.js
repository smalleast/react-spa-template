export default class extends React.PureComponent {

  render() {
    const {children, className} = this.props;
    return (
      <div className={classNames('my-detail-title  row row-center', className)}>
        <div className="col"/>
        <div className="wp-line-x mr5"/>
        <i className="iconfont wx-dian c-da"/>
        <div className="my-detail-title-name c-da f14 tc bold ">{children}</div>
        <i className="iconfont wx-dian c-da"/>
        <div className="wp-line-x ml5"/>
        <div className="col"/>
      </div>
    )

  }
}
