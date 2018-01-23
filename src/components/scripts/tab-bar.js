import {$route} from 'components/scripts/index';
import {Link} from 'react-router-dom';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    items: [{
      icon: 'iconfont wx-home',
      text: '主页',
      route: '/home',
    },
      {
        icon: 'iconfont wx-text',
        text: '案例',
        route: '/dome/list',
      },
      {
        icon: 'iconfont wx-tuijian1',
        text: '推荐',
        route: '/share',
        push: true
      },
      {
        icon: 'iconfont wx-kehu',
        text: '记录',
        route: '/client/list',
      },
      {
        icon: 'iconfont wx-wode',
        text: '我的',
        route: '/my/index',
      }],
    activeIndex: 0
  };

  componentWillMount() {

  }

  render() {
    const {activeIndex, items} = this.props;
    return (
      <div className="tab-bar">
        <div className="wp-icon-bar-bg">
          <div className="row row-center row-no-padding tab-bar-row  ">
            {
              items.map((item, index) => {
                return (<Link key={index} to={item.route}
                              className={classNames('col', activeIndex === index ? 'active' : '')}>
                  {
                    item.push && <span className="db bar-push"> <i
                      className={classNames('db bar-push-icon bar c-f', item.icon)}/></span>
                  }
                  {
                    !item.push && <i className={classNames('db bar bar-icon', item.icon)}/>
                  }
                  <span className="db bar-text mt3 f11">{item.text}</span>
                </Link>)
              })
            }
          </div>
        </div>
      </div>
    )

  }
}
