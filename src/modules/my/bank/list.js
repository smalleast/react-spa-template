import './index.scss';
import {Link} from 'react-router-dom';
import AppBase, {MyBankAdd, MyBank, $store, $api,$wechat} from 'components/scripts/index';

export default class extends AppBase {
  state = {
    lists: []
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._bank_card_info().then(res => {
      this.setState({
        lists: res.data
      })
    });

  }

  _bank_card_info() {
    return $api.user('get', '', 'bank_card_info');
  }
  componentDidMount() {
    $wechat.updateTitle('银行卡-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {lists} = this.state;
    return (
      <section className="my-bank-list">
        {
          lists.map((item, index) => {
            return (
              <div key={index}>
                <MyBank item={item}/>
              </div>
            )
          })
        }
        <div className="mt15">
        <Link to="/my/bank/add">
          <MyBankAdd/>
        </Link>
        </div>

      </section>
    )
  }
}
