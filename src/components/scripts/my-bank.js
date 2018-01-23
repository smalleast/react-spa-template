import {MyRadio,RSM} from './index';

export default class extends React.PureComponent {


  render() {
    const {item} = this.props;
    return (
      <div className="bank-bg" data-code={item.bankCode}>
        <div className="row row-center bank-bg-row">
          <div className="left mr10">
            <div className="bank-icon-bg bg-f">
              <RSM status={item.bankCode} statusList={['default', 'CCB', 'CMB', 'ICBC', 'COMM', 'BOC', 'CEB', 'CIB']}>
                <i className="iconfont wx-qitayinhang bank"/>
                <i className="iconfont wx-jiansheyinhang bank" data-text='CCB'/>
                <i className="iconfont wx-zhaoshang bank" data-text='CMB'/>
                <i className="iconfont wx-gongshangyinhang bank" data-text='ICBC'/>
                <i className="iconfont wx-jiaotong bank" data-text='COMM'/>
                <i className="iconfont wx-zhongguo bank" data-text='BOC'/>
                <i className="iconfont wx-guangdayinhang bank" data-text='CEB'/>
                <i className="iconfont wx-xingyeyinhang bank" data-text='CIB'/>
              </RSM>
            </div>
          </div>
          <div className="col">
            <output className="db c-f f16">{item.bankName}</output>
            <output className="db mt5 f14 c-f">储蓄卡</output>
          </div>
          <div className="right">
            {item.active && <MyRadio active={item.active}/>}
          </div>
        </div>
        <div className="bank-card-num c-f tr">{item.cardNum.substr(-4)}</div>
      </div>
    )

  }
}
