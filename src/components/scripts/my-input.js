import {InputItem} from 'antd-mobile';

export default class extends React.PureComponent {

  static defaultProps = {
    line: true,
    placeholder: '请输入信息',
    extra: false,
    onChange: nx.noop,
    value: '',
    left: false,
    type: 'text',
    required: false,
    maxLength:50
  };

  render() {
    const {title, line, children, extra, onChange, placeholder, required, left, type, value, className, maxLength} = this.props;
    return (
      <div className="my-input bg-f">
        <div className="row row-center row-no-padding">
          {
            (title || extra && children.length === 2) &&
            <div className={classNames('left f15 c-37', left ? 'pl15 pr15' : 'pr10')}>
              {title || extra && children[0] || children}{required && <span className="c-da f14">*</span>}
            </div>
          }

          <div className="col center">
            {
              value && <InputItem value={value} type={type} placeholder={placeholder}
                                  onChange={onChange.bind(this)} maxLength={maxLength}/>
            }
            {
              !value && <InputItem  type={type} placeholder={placeholder}
                                   onChange={onChange.bind(this)} maxLength={maxLength}/>
            }

          </div>
          {
            extra && <div className="right">
              {children.length === 2 && children[1] || children}
            </div>
          }
        </div>
        {
          line && <div className="line-d-1"/>
        }
      </div>
    )

  }
}
