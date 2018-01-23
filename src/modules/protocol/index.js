import './index.scss'
import {List, InputItem, TextareaItem, ActionSheet} from 'antd-mobile';
import {MyRadio} from 'components/scripts/index';

export default class extends React.Component {
  state = {
    sex: true,

  };

  _onSex(hasSex) {
    if (hasSex) {
      this.setState({
        sex: true
      })
    } else {
      this.setState({
        sex: false
      })
    }
  }


  render() {
    const {sex, project, styles, price} = this.state;
    return (
      <section className="protocol wp-bgf pt20">
        <div className="bd wp-auto">
          <div className="f16 c-37 bold">
            住逻辑分享家用户协议
          </div>
          <div className="f14 c-37 lh30 mt20">
            住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议住逻辑分享家用户协议
          </div>
        </div>
      </section>
    )
  }
}
