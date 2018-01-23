import {RA,$app} from 'components/scripts/index';

export default class extends React.PureComponent {

  render() {
    const {item} = this.props;
    return (
      <div  className="card-item">
        <div className="card-item-img">
          <RA url={$app.toImg(item.coverFile.key)} radius=".1rem" size={{width: '3.3rem', height: '2.2rem'}}/>
        </div>
        <div className="card-item-name c-37 f13 mt8 lc-1">
          {item.name}
        </div>
        <div className="card-item-price c-da f11 mt8">
          <span className="button-t">佣</span><span className="c-da f11 ml5">奖励佣金{item.commission}%</span>
        </div>
      </div>
    )

  }
}
