import './index.scss'
import AppBase, {MyInput,$store,$api,$wechat} from 'components/scripts/index';

export default class extends AppBase {
  state = {
    companyCode: '',
    hasDisabled: true
  };

  _verification() {
    const {companyCode} = this.state;
    if (companyCode) {
      this.setState({
        hasDisabled: false
      })
    } else {
      this.setState({
        hasDisabled: true
      })
    }
  }

  _onSubmit() {
    this._upgrade_organization().then(res => {
      return this._getInfo();
    }).then(res=>{
      $store.local = {
        info: res.data
      };
      this.props.history.replace('/my/info')
    })
  }

  _upgrade_organization() {
    const {companyCode} = this.state;
    return $api.user('post', {
      channelCode: companyCode
    }, 'upgrade_organization');
  }
  componentDidMount() {
    $wechat.updateTitle('独立分享家-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {companyCode, hasDisabled} = this.state;
    return (
      <section className="my-info-phone wp-bgf ">
        <div className="wp-auto-p">
          <div className="hd f17 c-37 bold mt20 mb20">
            升级为机构分享家
          </div>
          <div className="bd">
            <MyInput  placeholder="输入机构代码"
                     onChange={this.inputChange.bind(this, 'companyCode', this._verification.bind(this))}/>
          </div>
        </div>
        <article className="fd">
          <button className="button button-primary" disabled={hasDisabled} onClick={this._onSubmit.bind(this)}>提交
          </button>
          <div className="c-37 f14 tl wp-auto wp-ls">机构联系合作欢迎致电：400-998-0137          </div>
        </article>
      </section>
    )
  }
}
