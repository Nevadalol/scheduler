import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';
import { DayView } from './DayView';

export class WeekView {
  constructor () {
    this.config = Config.getInstance().calendar;
    this.ctx = Canvas.getCtx('calendar');
    this.dayView = new DayView();
  }

  render () {
    for (var day = 0; day < this.config.week.dayCols; ++day) {
      // save initial translate position
      this.ctx.save();

      // set offset for minute
      this.ctx.translate(this.config.minute.width * day, 0);

      // render days
      this.dayView.render();

      // restore initial translate position
      this.ctx.restore();
    }
  }
}
