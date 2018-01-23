import AppBase, {$store, $api, $app, $wechat} from 'components/scripts/index';

export default class extends AppBase {

  state = {
    name: '',
    count: 0,
    qrCode: undefined
  };

  componentWillMount() {
    this.init();
  }

  init() {


    this._qr_code().then(res => {
      this.setState({
        qrCode: res.data.brokerCode,
        name: res.data.realName
      })
    })

  }



  _qr_code() {
    const {id} = nx.hashlize();
    return $api.user('get', id, 'info');
  }

  componentDidMount() {

    $wechat.updateTitle('发展分享家-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {name, qrCode} = this.state;
    const {count} = nx.hashlize();
    return (
      <section className="my-recommend-index wp-icon-share wp-icon-share-bg">
        <div className="bd">
          <div className="bd-content">
            <div className="mb10">
              <span className="f33 c-f mr10">您的好友</span>
              <span className={classNames('f33 c-f bd-content-name', name.length > 5 ? 'db' : '')}>{name}</span>
            </div>
            <div className="f33 c-f mb5">邀请您一起上</div>
            <div className="row row-center">
              <i className="iconfont wx-dian c-f"/>
              <span className="f33 c-f bold">逻辑分享家</span>
              <i className="iconfont wx-dian c-f"/>
            </div>
            <div className="f33 c-f">海量佣金轻松赚</div>
            <div className="bd-content-code">
              <img src={$app.toImg64(qrCode)} alt=""/>
            </div>
          </div>
        </div>
        {
          count && count > 0 && <div className="fd bg-f">
            <a href="/my/recommend/list" target="_blank">
              <div className="row row-center wp-item wp-10">
                <div className="col tl f16 c-37">查看已发展经纪人</div>
                <div className="right"><span className="mr10 f16 c-37">{count | 0}人</span><i
                  className="iconfont wx-arrow-left"/>
                </div>
              </div>
            </a>
          </div>
        }

      </section>
    )
  }
}
