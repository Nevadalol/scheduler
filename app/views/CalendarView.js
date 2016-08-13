import { Mediator } from '../utils/Mediator';
import { Canvas } from '../utils/Canvas';
import { Config } from '../utils/Config';
import { SidebarView } from './SidebarView';
import { WeekView } from './WeekView';

export class CalendarView {
  constructor () {
    this.createContainers();

    this.rightSidebarView = new SidebarView('right');
    this.leftSidebarView = new SidebarView('left');

    this.createCanvas();
    this.listenForRerender();
  }

  createContainers () {
    this.canvasContainer = document.createElement('div');
    this.el = document.createElement('div');
    this.config = Config.getInstance();

    this.canvasContainer.id = 'canvas-container';
    this.el.id = 'calendar';
  }

  render () {
    // render left sidebar
    this.el.appendChild(this.leftSidebarView.render().canvas);

    // render calendar greed
    for (let week = 0; week < this.config.calendar.week.weeks; ++week) {
      new WeekView(week).render();
    }

    // append calendar greed
    this.canvasContainer.appendChild(this.canvas);
    this.el.appendChild(this.canvasContainer);

    // render right sidebar
    this.el.appendChild(this.rightSidebarView.render().canvas);

    return this;
  }

  listenForRerender () {
    Mediator.subscribe('Calendar.renderWeek', this.renderWeek);
  }

  renderWeek () {
    new WeekView(0).render();
  }

  createCanvas () {
    this.canvas = Canvas.create('calendar', {
      height: this.config.calendar.height,
      width: this.config.calendar.width
    });

    this.ctx = Canvas.getCtx('calendar');
  }
}
