import './index.scss';
import {Link} from 'react-router-dom';
import AppBase, {MyBankAdd, MyInput, MyBank, $api,$wechat} from 'components/scripts/index';

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
    $wechat.updateTitle('选择银行卡-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {lists} = this.state;
    return (
      <section className="my-info-phone pb15 ">
        {
          lists.map((item, index) => {
            return (
              <Link key={index} replace={true} to={'/my/brokerage/withdraw/' + item.id}>
                <MyBank item={item}/>
              </Link>
            )
          })
        }
        <Link to="/my/bank/add">
          <MyBankAdd/>
        </Link>
      </section>
    )
  }
}
