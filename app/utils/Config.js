import _ from '../../node_modules/underscore';

const config = {
  el: '#canvas-scheduler',

  calendar: {
    // delay, before start moving
    // appointment, ms
    moveDelay: 150,
    weekCols: 1,

    startDate: new Date().getDate(),

    week: {
      dayCols: 3
    },

    day: {
      hourRows: 5,
    },

    hour: {
      minuteRows: 6,
      height: 120
    },

    minute: {
      width: 259
    },

    sidebar: {
      width: 38
    },

    style: {
      week: {},

      day: {
        borderColor: '#aabed0'
      },

      hour: {
        borderColor: '#c0c0c0'
      },

      minute: {
        borderColor: '#ddd'
      },

      sidebar: {
        borderColor: '#aabed0',
        font: '11px Segoe UI',
        minuteColor: '#ddd',
        fontColor: '#bbb'
      }
    }
  }
};

export class Config {
  constructor () {
    this.config = this.getCalculatedConfig();
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new Config();
    }

    return _.clone(this.instance.config);
  }

  getCalculatedConfig () {
    var minuteHeight = config.calendar.hour.height / config.calendar.hour.minuteRows;

    config.calendar.minute.height = minuteHeight;
    config.calendar.height = config.calendar.day.hourRows * config.calendar.hour.height;
    config.calendar.width = config.calendar.weekCols * config.calendar.week.dayCols * config.calendar.minute.width;

    return config;
  }
}
