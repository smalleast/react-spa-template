import toThousands from 'to-thousands';
import moment from 'moment';
import $config from './config';

export default class {
  static toImg(inValue) {
    return inValue ? $config.IMG_SERVER + '/' + inValue : '';
  }

  static toImg64(inValue) {
    return inValue ? 'data:image/png;base64,' + inValue : '';
  }

  static currency(value, maxValue) {
    if (!value || !(value - 0) || isNaN(value - 0)) return '¥ 0';
    if (maxValue && value > maxValue) value = maxValue + '+';
    return `¥ ${toThousands(value - 0)}`;
  }

  static toDecimal(inValue) {
    let _value = parseFloat(inValue || 0).toFixed(2);
    if (_value === 0) {
      return '¥ 0.00';
    }
    if ((_value).toString().indexOf('.') < 0) {
      return `¥ ${toThousands(_value)}`;
    }
    return `¥ ${toThousands(_value)}`;
  }

  static toPrice(inValue) {
    let _value = parseFloat(inValue || 0).toFixed(2);
    return toThousands(_value);
  }


  static priceToThousands(inValue) {
    let num = (parseInt(inValue) || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    if (result - 0 === 0) {
      result = '0';
    }
    return result;
  }

  static nl2br(inMsg, inISXhtml) {
    const is_xhtml = inISXhtml || false;
    const breakTag = (is_xhtml) ? '<br />' : '<br>';
    const msg = (inMsg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');

    return msg;
  }

  static toDate(inDate) {
    if (!!inDate) {
      return moment(inDate).format('YYYY-MM-DD');
    }
  }

  static toDateTime(inDateTime) {
    if (!!inDateTime) {
      return moment(inDateTime).format('YYYY-MM-DD HH:mm:ss');
    }
  }

  static trim(inValue) {
    return inValue.replace(/\s/g, "");
  }
}
