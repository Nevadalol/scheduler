import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';
import { HourView } from './HourView';

export class DayView {
  constructor () {
    this.config = Config.getInstance().calendar;
    this.ctx = Canvas.getCtx('calendar');
    this.hourView = new HourView();
  }

  render () {
    this.renderHours();
    this.renderBorder();
  }

  renderHours () {
    for (var hour = 0; hour < this.config.day.hourRows; ++hour) {
      // save initial translate position
      this.ctx.save();

      // set offset for minute
      this.ctx.translate(0, this.config.minute.height * this.config.hour.minuteRows * hour);

      // render hours
      this.hourView.render();

      // restore initial translate position
      this.ctx.restore();
    }
  }

  renderBorder () {
    this.ctx.beginPath();

    this.ctx.strokeStyle = this.config.style.day.borderColor;
    this.ctx.moveTo(this.config.minute.width + 0.5, 0);
    this.ctx.lineTo(this.config.minute.width + 0.5, this.config.day.hourRows * this.config.hour.height);
    this.ctx.stroke();

    this.ctx.closePath();
  }
}
