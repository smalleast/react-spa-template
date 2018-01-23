import {RSM} from './index';

export default class extends React.PureComponent {
  static defaultProps = {
    hasPrice: false,
    status: []
  };

  render() {
    const {children, className, hasPrice, status} = this.props;
    return (
      <div className={classNames('my-steps', className)}>
        {
          children && children.map((item, index) => {
            return (
              <div key={index} className={classNames('my-steps-item', index === 0 ? 'active' : '')}>
                {
                  index !== (children.length - 1) && <span className="left-x"/>
                }
                {
                  index === 0 && <span className="left-d active"/>
                }
                {
                  index !== 0 && !hasPrice && <span className="left-d"/>
                }
                {
                  index === (children.length - 1) && hasPrice && <RSM status={status} statusList={[1, 2, 3]}>
                    <span className="left-d-price bg-bf f15">¥</span>
                    <span className="left-d-price bg-green f15">¥</span>
                    <span className="left-d-price bg-da f15">¥</span>
                  </RSM>
                }
                {item}
              </div>
            )
          })
        }
      </div>
    )

  }
}
