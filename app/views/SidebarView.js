import _ from '../../node_modules/underscore';
import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';

export class SidebarView {
  constructor (side) {
    this.config = Config.getInstance().calendar;
    this.side = side;
    this.createCanvas();
  }

  render () {
    _.defer(() => this.renderColumn());

    return this;
  }

  renderColumn () {
    this.ctx.beginPath();

    this.ctx.strokeStyle = this.config.style.sidebar.borderColor;
    this.ctx.rect(0, 0, this.config.sidebar.width, this.config.hour.hours * this.config.hour.height);
    this.ctx.stroke();
    this.renderHours();

    this.ctx.closePath();
  }

  renderHours () {
    for (var hour = 0; hour < this.config.hour.hours; hour++) {
      this.ctx.beginPath();

      this.ctx.strokeStyle = this.config.style.sidebar.borderColor;
      this.ctx.fillStyle = this.config.style.sidebar.hourColor;

      this.ctx.moveTo(0, hour * this.config.hour.height + 0.5);
      this.ctx.lineTo(this.config.sidebar.width, hour * this.config.hour.height + 0.5);
      this.ctx.stroke();
      this.renderText(hour, this.config.sidebar.width / 2, hour * this.config.hour.height + 15);
      this.renderMinutes(hour);

      this.ctx.closePath();
    }
  }

  renderMinutes (hour) {
    var direction = (this.side === 'left') ? 1 : -1;

    this.ctx.beginPath();
    this.ctx.setLineDash([1, 1]);

    this.ctx.strokeStyle = this.config.style.minute.borderColor;
    this.ctx.fillStyle = this.config.style.sidebar.minuteColor;

    for (var minute = 1; minute <= this.config.minute.minutes; minute++) {
      this.ctx.moveTo(this.config.sidebar.width / 2, hour * this.config.hour.height + minute * this.config.minute.height + 0.5);
      this.ctx.lineTo(direction * this.config.sidebar.width, hour * this.config.hour.height + minute * this.config.minute.height + 0.5);

      //TODO
      // do smth with this if
      if (minute !== this.config.minute.minutes) {
        this.renderText(
          (60 / this.config.minute.minutes * minute) % 60,
          this.config.sidebar.width / 2,
          hour * this.config.hour.height + minute * this.config.minute.height + 15
        );
      }
    }

    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.closePath();
  }

  renderText (text, x, y) {
    this.ctx.font = this.config.style.sidebar.font;
    this.ctx.fillText(text, x, y);
  }

  createCanvas () {
    this.canvas = Canvas.create('sidebar.' + this.side, {
      height: this.config.hour.hours * this.config.hour.height,
      width: this.config.sidebar.width
    });

    this.ctx = Canvas.getCtx('sidebar.' + this.side);
    this.canvas.id = 'sidebar-' + this.side;
  }
}
