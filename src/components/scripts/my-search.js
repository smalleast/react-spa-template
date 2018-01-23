import {SearchBar} from 'antd-mobile';

export default class extends React.PureComponent {
  state = {
    key: ''
  };

  _onKeyUp(e) {
    const {onClick} = this.props;
    if (e.key === 'Enter' || e.keyCode === 13) {
      const {key} = this.state;
      onClick(key);
    }
  }

  inputChange(inValue) {
    const {onClick} = this.props;
    let keywords = inValue.target.value;
    this.setState({
      key: keywords
    }, () => {
      onClick(keywords);
    })
  }

  render() {
    const {className, onClick} = this.props;
    const {key} = this.state;

    return (
      <section className={classNames('my-search', className)}>
        <form className="am-search" action="javascript:void(0)">
          <i className="iconfont wx-search c-7"/>
          <input type="search" className="am-search-value f14" maxLength={20} value={key}
                 onChange={this.inputChange.bind(this)}
                 onKeyUp={this._onKeyUp.bind(this)}
                 placeholder="搜索"/>
        </form>
      </section>
    )

  }
}
