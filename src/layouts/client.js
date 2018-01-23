export default class extends React.PureComponent {

  render() {
    return (
      <section className="client">
        {this.props.children}
      </section>
    )
  }
}
