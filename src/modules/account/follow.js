import {Modal} from 'antd-mobile';
import {RA} from 'components/scripts/index';
import './index.scss';
import AccountTop from './top'

export default class extends React.PureComponent {
  state = {
    hasModal: false,
  };

  _onModal() {
    this.setState({
      hasModal: true
    })
  }

  _onClose() {
    this.setState({
      hasModal: false
    })
  }

  render() {
    const {className,qrCode} = this.props;
    const {hasModal } = this.state;
    console.log(qrCode);
    return (
      <div className={classNames('follow dib', className)}>
        <Modal visible={hasModal}
               closable={false}
               animationType="slide-up"
               className="pt20 bg-f">
          <AccountTop/>
          <div className="follow-bd ">
            <RA url={qrCode} size="4.48rem" radius="0"/>
            <div className="f14 c-6 mt15 mb15">识别二维码关注逻辑分享家<br/>享受更多贴心服务</div>
            <a href="/home" className="f14 c-8 follow-link">跳过</a>
          </div>
        </Modal>
      </div>
    )

  }
}
