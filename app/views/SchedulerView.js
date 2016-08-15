import { Session } from '../domain/Session';
import { _ } from '../../node_modules/underscore';
import { MouseEvents } from '../utils/MouseEvents';
import { Mediator } from '../utils/Mediator';
import { Config } from '../utils/Config';
import { RightSidebarView } from './RightSidebarView';
import { LeftSidebarView } from './LeftSidebarView';
import { CalendarView } from './CalendarView';

export class SchedulerView {
  constructor () {
    this.config = Config.getInstance();
    this.calendarView = new CalendarView();

    this.el = document.createElement('div');
    this.el.id = 'calendar';
  }

  render () {
    this.el.appendChild(new LeftSidebarView().render().canvas);
    // TODO
    // Call render before inserting into DOM
    this.el.appendChild(this.calendarView.el);
    this.calendarView.render();
    this.el.appendChild(new RightSidebarView().render().canvas);

    document.querySelector(this.config.container).appendChild(this.el);
    MouseEvents.getInstance().addEventListeners();

    // fake appointments
    var today = new Date();
    today.setHours(1);
    today.setMinutes(10);

    var t = new Date();
    t.setHours(3);
    t.setMinutes(20);

    Session.getInstance().add([{
      id: 1,
      title: 'Title',
      body: 'Body text here',
      headerColor: '#1976D2',
      bodyColor: '#2196F3',
      timestamp: today,
      // 1 hour 20 minutes
      duration: 4800000
    }, {
      id: 2,
      title: 'Title',
      body: 'Body text here',
      headerColor: '#1976D2',
      bodyColor: '#2196F3',
      timestamp: t,
      // 1 hour 20 minutes
      duration: 4800000
    }]);

    return this;
  }
}
