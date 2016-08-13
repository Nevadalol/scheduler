import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';
import { MinuteView } from './MinuteView';

export class HourView {
  constructor (hour) {
    this.config = Config.getInstance().calendar;
    this.ctx = Canvas.getCtx('calendar');
    this.minuteView = new MinuteView();
  }

  render () {
    this.renderBorder();
    this.renderMinutes();
  }

  renderBorder () {
    this.ctx.beginPath();

    this.ctx.strokeStyle = this.config.style.hour.borderColor;
    this.ctx.moveTo(0, 0.5);
    this.ctx.lineTo(this.config.minute.width, 0.5);
    this.ctx.stroke();

    this.ctx.closePath();
  }

  renderMinutes () {
    for (var minute = 1; minute <= this.config.hour.minuteRows; ++minute) {
      // save initial translate position
      this.ctx.save();

      // set offset for minute
      this.ctx.translate(0, this.config.minute.height * minute);

      // render minutes
      this.minuteView.render(minute);

      // restore initial translate position
      this.ctx.restore();
    }
  }
}
