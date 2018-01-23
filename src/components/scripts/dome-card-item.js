import {RA, $app} from 'components/scripts/index';
import MyBrokerage from './my-brokerage';
import MyTip from './my-tip';

export default class extends React.PureComponent {

  render() {
    const {item} = this.props;
    return (
      <div className="dome-card-item">
        <div className="dome-card-item-img">
          <img src={$app.toImg(item.coverFile.key)} alt=""/>
          <MyTip className="abs bg-da">约{item.area}㎡</MyTip>
        </div>
        <div className="bd">
          <div className="row row-center row-no-padding bd-name">
            <div className="left col tl c-37 f14 bold">{item.name}</div>
            <div className="right col tr c-37 f11">软装采购 {$app.currency(item.price)}</div>
          </div>
          <div className="bd-style">
            <div className="row row-center row-no-padding">
              {
                item.styles.map((item, index) => {
                  return (
                    <div key={index} className="v-item button-x mr5">
                      {item}
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="bd-price">
            <MyBrokerage commission={item.commission}/>
          </div>
        </div>

      </div>
    )

  }
}
