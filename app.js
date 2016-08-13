import { SchedulerView } from './app/views/SchedulerView';

console.time('Schedule rendered in');

new SchedulerView({
  el: '#canvas-scheduler',

  calendar: {
    // delay, before start moving
    // appointment, ms
    moveDelay: 150,
    fps: 1000/60,

    startDate: new Date().getDate(),

    week: {
      weeks: 1
    },

    day: {
      days: 3
    },

    hour: {
      hours: 5,
      height: 120
    },

    minute: {
      width: 259,
      minutes: 6
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
        hourColor: '#c0c0c0',
        minuteColor: '#ddd',
        fontColor: '#bbb'
      }
    }
  }
}).render();

console.timeEnd('Schedule rendered in');