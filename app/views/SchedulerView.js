import { Session } from '../domain/Session';
import { MouseEvents } from '../utils/MouseEvents';
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
        document.querySelector(this.config.container).appendChild(this.el);
    this.calendarView.render();
    this.el.appendChild(new RightSidebarView().render().canvas);


    MouseEvents.getInstance().addEventListeners();

    // fake appointment
    var today = new Date();
    today.setHours(1);
    today.setMinutes(10);

    Session.getInstance().add([{
      id: 1,
      headerColor: '#1976D2',
      timestamp: today,
      // 1 hour 20 minutes
      duration: 4800000
    }]);

    return this;
  }
}
