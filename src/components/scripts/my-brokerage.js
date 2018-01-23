import {RA} from 'components/scripts/index';

export default class extends React.PureComponent {
  static defaultProps = {
    commission: 3
  };

  render() {
    const {commission} = this.props;
    return (
      <section className="my-brokerage">
        <span className="button-t">佣</span><span className="c-da f11 ml5">奖励佣金{commission || 0}%</span>
      </section>
    )

  }
}
