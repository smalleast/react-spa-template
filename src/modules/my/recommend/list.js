import './index.scss';
import AppBase,{MyPhone, $app,$api,MyBrokerageTitle,$wechat} from 'components/scripts/index'

export default class extends AppBase {
  state = {
    lists: [],
    count:0
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._development_broker().then(res => {
      this.setState({
        lists: res.data.list,
        count:res.data.count
      })
    });


  }


  _development_broker() {
    return $api.development_broker('get', '', 'brokers');
  }
  componentDidMount() {
    $wechat.updateTitle('已发展经济人-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {lists,count} = this.state;
    return (
      <section className="my-recommend-list wp-bgf">
        <div className="hd wp-icon-share wp-icon-share-top-bg pt30">
          <div className="c-f f14">已发展分享家：</div>
          <div className="mt20"><span className="f30 c-f">{count|0}</span><span className="f14 c-f"> 人</span></div>
        </div>
        <div className="bd mt20 wp-auto">
          <MyBrokerageTitle >分享家记录</MyBrokerageTitle>
          {
            lists&&lists.map((item, index) => {
              return (
                <div key={index} className="bd-item wp-item row row-center row-no-padding">
                  <div className="left col tl">
                    <output className="db bold f16 c-37">{item.realName}</output>
                    <output className="db f11 c-7 mt5">{$app.toDateTime(item.createTime)}</output>
                  </div>
                  <div className="right">
                    <MyPhone className="lg">{item.mobilePhone}</MyPhone>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}
