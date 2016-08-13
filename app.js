import { SchedulerView } from './app/views/SchedulerView';

console.time('Schedule rendered in');

new SchedulerView().render();

console.timeEnd('Schedule rendered in');