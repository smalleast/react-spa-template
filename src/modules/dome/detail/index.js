import './index.scss'
import {RA,MyBrokerage,MyTip, MyDetailTitle, $api, $app, $items, $wechat} from 'components/scripts/index';

export default class extends React.Component {
  state = {
    detail: {}
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._projects().then(res => {
      this.setState({
        detail: res.data
      });
    });
  }

  _projects() {
    return $api.projects('get', this.props.match.params.id);
  }

  componentDidMount() {
    $wechat.updateTitle('案例详情-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {detail} = this.state;
    return (
      <section className="dome-detail bg-f">
        <div className="banner">
          {
            !!detail.coverFile &&<RA size={{width:'7.5rem',height:'5rem'}} url={$app.toImg(detail.coverFile.key)} radius="0"/>
          }
        </div>
        <div className="hd wp-auto">
          <div className="hd-one mt10">
            <div className="row row-center row-no-padding">
              <div className="left c-37 f14">
                {detail.name}
              </div>
              <div className="center ml10">
                <MyTip className="bg-da">约{detail.area}㎡</MyTip>
              </div>
              <div className="right col tr f11 c-37">
                软装采购 {$app.currency(detail.price)}
              </div>
            </div>
          </div>
          <div className="hd-two row row-center row-no-padding mt10">
            {
              detail.styles && detail.styles.length > 0 && detail.styles.map((item, index) => {
                return (
                  <div key={index} className="v-item button-x mr5">
                    {item}
                  </div>
                )
              })
            }
          </div>
          <div className="hd-three mt15">
            <MyBrokerage commission={detail.commission}/>
          </div>
        </div>
        <div className="bd">
          <MyDetailTitle>项目详情</MyDetailTitle>
          <div className="bd-content mt20">
            <p dangerouslySetInnerHTML={{__html: detail.content}}/>
          </div>
        </div>
      </section>
    )
  }
}
