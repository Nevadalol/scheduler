import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';

export class MinuteView {
  constructor () {
    this.config = Config.getInstance().calendar;
    this.ctx = Canvas.getCtx('calendar');
  }

  render (minute) {
    this.ctx.beginPath();

    // if it's not middle row,
    // draw it dotted
    if (minute !== this.config.hour.minuteRows / 2) {
      this.ctx.setLineDash([1, 1]);
    }

    this.ctx.strokeStyle = this.config.style.minute.borderColor;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.config.minute.width, 0);
    this.ctx.stroke();

    this.ctx.setLineDash([]);
    this.ctx.closePath();
  }
}
