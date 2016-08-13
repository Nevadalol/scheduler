import { AppointmentsCollection } from '../domain/AppointmentsCollection';
import { _ } from '../../node_modules/underscore';
import { MouseEvents } from '../utils/MouseEvents';
import { Mediator } from '../utils/Mediator';
import { Config } from '../utils/Config';
import { CalendarView } from './CalendarView';

export class SchedulerView {
  constructor (options) {
    this.config = Config.set(options).getInstance();

    this.appointments = AppointmentsCollection.getInstance();
    this.calendarView = new CalendarView();
    this.mouseEvents = new MouseEvents();
  }

  render () {
    var container = document.querySelector(this.config.el);

    // TODO
    // Call render before inserting into DOM
    container.appendChild(this.calendarView.el);
    this.calendarView.render();

    var today = new Date();
    today.setHours(1);
    today.setMinutes(10)

    // mock appointments
    var appointments = [{
      id: 1,
      title: 'Title',
      body: 'Body text here',
      headerColor: '#1976D2',
      bodyColor: '#2196F3',
      timestamp: today,
      // 1 hour 20 minutes
      duration: 4800000
    }];

    _.defer(() => Mediator.publish('Appointment.add', appointments));

    return this;
  }
}
