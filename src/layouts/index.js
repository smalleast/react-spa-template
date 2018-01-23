import {TabBar} from 'components/scripts/index';

export default class extends React.PureComponent {

  state = {
    activeIndex: 0
  };

  componentWillMount() {
    this._checkUrl();

  }

  componentDidUpdate() {
    this._checkUrl();
  }

  _checkUrl() {
    let url = location.href;
    let activeIndex = 0;
    if (url.indexOf('/home') > -1) {
      activeIndex = 0;
    }
    else if (url.indexOf('/dome') > -1) {
      activeIndex = 1;
    }
    else if (url.indexOf('/share') > -1) {
      activeIndex = 2;
    }
    else if (url.indexOf('/client') > -1) {
      activeIndex = 3;
    }
    else if (url.indexOf('/my') > -1) {
      activeIndex = 4;
    }
    this.setState({
      activeIndex: activeIndex
    })
  }
  componentWillReceiveProps(WnextProps) {
    this._checkUrl();
  }

  render() {
    const {activeIndex} = this.state;
    return (
      <section className="layout">
        {this.props.children}
        <TabBar activeIndex={activeIndex} />
      </section>
    )

  }
}
