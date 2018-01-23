export default class extends React.PureComponent {

  render() {
    const {children, className} = this.props;
    return (
      <button className={classNames('my-phone', className)}>
        {children}
      </button>
    )

  }
}
