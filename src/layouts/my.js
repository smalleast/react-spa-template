export default class extends React.PureComponent {

  render() {
    return (
      <section className="my">
        {this.props.children}
      </section>
    )
  }
}
