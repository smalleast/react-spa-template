import './index.scss';

export default class extends React.Component {

  state = {
    name: '阿星_阿星_阿星_阿星_阿星_阿星_阿星_阿星_阿星_阿星_阿星_'
  };
  componentWillMount(){

  }
  render() {
    const {name} = this.state;
    return (
      <section className="my-recommend-share bg-f5">
        <div className="hd bg-f">
          <div className="row row-center wp-10">
            <div className="col tc">测试</div>
            <div className="col tc">测试</div>
            <div className="col tc">测试</div>
            <div className="col tc">测试</div>
          </div>
        </div>
        <div className="bd">
          {
            [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15].map((item, index) => {
              return (
                <div className="bd-item bg-f" key={index}>{item}</div>
              )
            })
          }
        </div>
        <div className="fd bg-f">
          <div className="row row-center wp-10">
            <div className="col tc">测试</div>
            <div className="col tc">测试</div>
            <div className="col tc">测试</div>
            <div className="col tc">测试</div>
          </div>
        </div>
      </section>
    )
  }
}
