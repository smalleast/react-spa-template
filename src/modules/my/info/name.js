import './index.scss'
import AppBase, {MyInput, $store, $api,$wechat} from 'components/scripts/index';

export default class extends AppBase {
  state = {
    name: ''
  };

  componentWillMount() {
    this.init();
  }

  init() {
    const {info} = $store.local;
    this.setState({
      name: info.realName
    })
  }

  _onSubmit() {
    this._name().then(res => {
      return this._getInfo();
    }).then(res => {
      $store.local = {
        info: res.data
      };
      this.props.history.replace('/my/info')
    })
  }

  _name() {
    const {name} = this.state;
    return $api.user('put', {
      realName: name
    }, 'name');
  }
  componentDidMount() {
    $wechat.updateTitle('修改用户名-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {name} = this.state;
    return (
      <section className="my-info-name wp-bgf pt15">
        <div className="bd wp-auto">
          <MyInput placeholder="输入用户名"
                   onChange={this.inputChange.bind(this, 'name')}/>
        </div>
        <article className="fd">
          <button className="button button-primary" onClick={this._onSubmit.bind(this)}>提交</button>
        </article>

      </section>
    )
  }
}
