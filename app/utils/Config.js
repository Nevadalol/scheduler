import _ from '../../node_modules/underscore';

export class Config {
  static getInstance () {
    return _.clone(this.config);
  }

  static set (config) {
    var minuteHeight = config.calendar.hour.height / config.calendar.minute.minutes;

    config.calendar.minute.height = minuteHeight;
    config.calendar.height = config.calendar.hour.hours * config.calendar.hour.height;
    config.calendar.width = config.calendar.week.weeks * config.calendar.day.days * config.calendar.minute.width;

    this.config = config;

    return this;
  }

  static calculateAdditionalParams (config) {


    return config;
  }
}
