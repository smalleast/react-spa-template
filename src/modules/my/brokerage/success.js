import './index.scss';
import AppBase, {$api, RA, $app, MySteps, RSM, $wechat} from 'components/scripts/index';
import Result from './result';

export default class extends AppBase {
  state = {
    resultId: undefined
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this.setState({
      resultId: this.props.match.params.id
    })
  }


  _success() {
    this.props.history.replace('/home');
  }

  componentDidMount() {
    $wechat.updateTitle('提现申请提交-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {resultId} = this.state;
    return (
      <section className="my-info-phone pt15 wp-bgef">
        <div className="bg-f tc">
          <div className="bd pt15 pl15">
            <Result resultId={resultId}/>
          </div>
          <article className="fd">
            <button className="button button-primary" onClick={this._success.bind(this)}>完成</button>
          </article>
        </div>
      </section>
    )
  }
}
