/**
 * Created by tony on 2017/4/19.
 */
import moment from 'moment';

const DAY_OF_MILLISECONDS = 86400000;
const LOCAL_MAP = {
  CN: {
    '-1': '昨天',
    '0': '今天',
    '1': '明天'
  }
};

const formater = {
  diffDate(x1, times) {
    return Math.round(x1 / DAY_OF_MILLISECONDS) * -1;
  },
  CN(inDate, format) {
    let dateFormat = 'YYYY-MM-DD',
      outputFormat = 'YYYY年MM月DD日',
      nowDate = moment().format(dateFormat),
      dateDiff = moment(nowDate).diff(moment(inDate).format(dateFormat)),
      map = LOCAL_MAP.CN,
      diff = this.diffDate(dateDiff, DAY_OF_MILLISECONDS),
      formatSplits = (format || '').split(' '),
      timeFormat = formatSplits[1] || 'HH:mm';

    if (moment(nowDate).format('YYYY') === moment(inDate).format('YYYY')) {
      outputFormat = 'MM月DD日';
    }

    if (diff < -1 || diff > 1) {
      return moment(inDate).format(format.replace('CN', outputFormat));
    }
    return map[diff] + ' ' + moment(inDate).format(timeFormat);
  },
  NoToday(inDate) {
    let dataString = formater.CN(inDate, 'CN HH:mm');
    if (dataString.indexOf('今天') >= 0) {
      dataString = dataString.replace('今天', '').trim();
    }
    return dataString;
  }
};

class LocalDate {
  static format(inDate, format) {
    if (!format) format = 'CN HH:mm';
    var formatSplits = (format || '').split(' '), newFormat = formatSplits[0].trim();
    if (!formater[newFormat]) return moment(inDate).format(format);
    return formater[newFormat](inDate, format);
  }

  static countDown(inSecond) {
    if (!inSecond) inSecond = 0;
    var hours = parseInt(inSecond / 3600);
    var minutes = parseInt((inSecond % 3600) / 60);
    var second = parseInt((inSecond % 3600) % 60);
    return hours + ' 时 ' + minutes + ' 分 ' + second + ' 秒';
  }

  static payCountDown(inLimit) {
    let payText = '';
    if (inLimit) {
      let differ = (new Date(inLimit).getTime() - new Date().getTime()) / 1000;
      let day = parseInt(differ / (24 * 3600));
      let hours = parseInt((differ % (24 * 3600)) / 3600);
      if (day < 1) {
        day = 0;
      }
      if (hours < 1) {
        hours = 0;
      }
      payText = ' ' + day + ' 天 ' + hours + ' 小时';
    }
    return payText;
  }
}

export default LocalDate;
