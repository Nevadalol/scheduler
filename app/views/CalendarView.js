import { Mediator } from '../utils/Mediator';
import { Canvas } from '../utils/Canvas';
import { Config } from '../utils/Config';
import { WeekView } from './WeekView';

export class CalendarView {
  constructor () {
    this.config = Config.getInstance();
    this.createEl();
    this.createCanvas();

    Mediator.subscribe('calendar:render', this.renderWeek);
  }

  createEl () {
    this.el = document.createElement('div');
    this.el.id = 'canvas-container';
  }

  render () {
    // render calendar greed
    for (let week = 0; week < this.config.calendar.weekCols; ++week) {
      new WeekView(week).render();
    }

    // append calendar greed
    this.el.appendChild(this.canvas);

    return this;
  }

  renderWeek () {
    new WeekView(0).render();
  }

  createCanvas () {
    this.canvas = Canvas.create('calendar', {
      height: this.config.calendar.height + 1,
      width: this.config.calendar.width
    });

    this.ctx = Canvas.getCtx('calendar');
  }
}
