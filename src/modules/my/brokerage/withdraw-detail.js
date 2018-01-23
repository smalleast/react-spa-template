import {Modal} from 'antd-mobile';
import Result from './result';

export default class extends React.PureComponent {

  render() {
    const {hasModal, onClick, resultId, className} = this.props;
    return (
      <div className={classNames('withdraw-detail dib', className)}>
        <Modal visible={hasModal}
               closable={true}
               onClose={onClick.bind(this)}
               animationType="slide-up"
               className="pt20 bg-f">
          <div className="bd wp-auto" onClick={onClick.bind(this)}>
            <Result resultId={resultId}/>
          </div>
          <article className="fd mt20">
            <button className="button button-primary" onClick={onClick.bind(this)}>返回</button>
          </article>
        </Modal>
      </div>
    )

  }
}
