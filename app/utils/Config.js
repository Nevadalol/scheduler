import _ from '../../node_modules/underscore';

export class Config {
  static getInstance () {
    return _.clone(this.config);
  }

  static set (config) {
    var minuteHeight = config.calendar.hour.height / config.calendar.hour.minuteRows;

    config.calendar.minute.height = minuteHeight;
    config.calendar.height = config.calendar.day.hourRows * config.calendar.hour.height;
    config.calendar.width = config.calendar.weekCols * config.calendar.week.dayCols * config.calendar.minute.width;

    this.config = config;

    return this;
  }

  static calculateAdditionalParams (config) {


    return config;
  }
}
