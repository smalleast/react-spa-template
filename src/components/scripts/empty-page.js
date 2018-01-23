export default class extends React.PureComponent {
  render() {
    const {children} = this.props;
    return (
      <section className="empty-page">
        <div className="empty-page-content tc">
          <output className="iconfont wx-kongyemian db empty-page-icon"/>
          <output className="db f15 c-7 mt10">{children ? children : '暂无内容哦'}</output>
        </div>
      </section>
    )
  }
}
