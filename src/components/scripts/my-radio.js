export default class extends React.PureComponent {
  static defaultProps = {
    active: false,
    onClick: nx.noop
  };

  render() {
    const {className, active, onClick} = this.props;
    return (
      <span className={classNames('my-radio', {'active': active}, className)} onClick={onClick.bind(this)}>
        <i className="iconfont wx-hook"/>
      </span>
    )

  }
}
