export default class extends React.PureComponent {

  render() {
    const {children, className} = this.props;
    return (
      <section className={classNames('my-tip', className)}>{children}</section>
    )

  }
}
