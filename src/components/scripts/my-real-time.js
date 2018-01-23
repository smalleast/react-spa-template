import {$app} from './index';
import {Carousel} from 'antd-mobile';

export default class extends React.PureComponent {
  static defaultProps = {
    lists: []
  };

  render() {
    const {lists} = this.props;
    return (
      <div className="my-real-time">
        {
          lists && <Carousel className="my-carousel"
                             vertical
                             dots={false}
                             dragging={false}
                             swiping={false}
                             autoplay
                             infinite
          >
            {
              lists.map((item, index) => {
                return (
                  <div key={index} className="v-item">
                    <span className="f11 c-7 lc-1">祝贺{item.projectName}成功落地，金额{$app.toPrice(item.price)}元
                    </span>
                    <span className="f11 c-37 lc-1 mt3">恭喜{item.realName}获得奖励{$app.toPrice(item.commission)}元</span>
                  </div>
                )
              })
            }
          </Carousel>
        }
      </div>
    )

  }
}
