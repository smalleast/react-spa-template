export default class extends React.PureComponent {

  render() {
    return (
      <section className="dome">
        {this.props.children}
      </section>
    )
  }
}
