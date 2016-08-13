import { SchedulerView } from './app/views/SchedulerView';

console.time('Schedule rendered in');

new SchedulerView({
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
}).render();

console.timeEnd('Schedule rendered in');