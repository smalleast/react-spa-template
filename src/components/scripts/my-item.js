import {Link} from 'react-router-dom';

export default class extends React.PureComponent {


  render() {
    return (
      <div className="my-item bg-f">
        <div className="row row-center wp-auto my-item-bd">
          <Link to="/my/brokerage" className="col tc">
            <div className="col-icon">
              <i className="iconfont wx-yongjin lg-1 c-da"/>
            </div>
            <output className="db f14 mt5 c-37">佣金</output>
          </Link>
          <Link to="/my/message" className="col tc">
            <div className="col-icon">
              <i className="iconfont wx-xiaoxi lg c-da"/>
            </div>
            <output className="db f14 mt5 c-37">消息</output>
          </Link>
          <Link to="/client/list" className="col tc">
            <div className="col-icon">
              <i className="iconfont wx-jilu lg c-da"/>
            </div>
            <output className="db f14 mt5 c-37">推荐</output>
          </Link>
        </div>
      </div>
    )

  }
}
