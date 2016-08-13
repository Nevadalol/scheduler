import { Config } from './Config';

export class Util {
  static getTime (x, y) {
    let config = Config.getInstance().calendar,
        day = Math.floor(x / config.minute.width),
        hour = Math.floor(y / config.hour.height),
        minuteRow = Math.floor((y % config.hour.height) / config.minute.height),
        minute = (60 / config.hour.minuteRows * minuteRow) % 60;

    return {
      day: day + config.startDate,
      hour: hour,
      minute: minute
    };
  }
}
