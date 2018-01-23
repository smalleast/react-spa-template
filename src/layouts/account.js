export default class extends React.PureComponent {

  render() {
    return (
      <section className="account">
        {this.props.children}
      </section>
    )
  }
}
