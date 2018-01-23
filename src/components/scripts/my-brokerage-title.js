export default class extends React.PureComponent {

  render() {
    const {className, children,...props} = this.props;
    return (
      <div className={classNames('my-brokerage-title row row-center row-no-padding wp-auto', className)} {...props}>
        <span className="iconfont wx-jilu c-37 my-brokerage-title-icon"/>
        <span className="my-brokerage-title-name f15 bold c-37 ml10">{children}</span>
      </div>
    )
  }
}
