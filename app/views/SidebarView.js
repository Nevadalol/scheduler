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
    this.ctx.rect(0, 0, this.config.sidebar.width, this.config.day.hourRows * this.config.hour.height);
    this.ctx.stroke();
    this.renderHours();

    this.ctx.closePath();
  }

  renderHours () {
    this.ctx.strokeStyle = this.config.style.sidebar.borderColor;
    this.ctx.fillStyle = this.config.style.sidebar.hourColor;
    this.ctx.font = this.config.style.sidebar.font;

    for (var hour = 0; hour < this.config.day.hourRows; hour++) {
      this.ctx.beginPath();

      this.ctx.moveTo(0, hour * this.config.hour.height + 0.5);
      this.ctx.lineTo(this.config.sidebar.width, hour * this.config.hour.height + 0.5);
      this.ctx.stroke();

      //this.renderHourText(hour);
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

    for (var minute = 1; minute <= this.config.hour.minuteRows; minute++) {
      this.ctx.moveTo(this.config.sidebar.width / 2, hour * this.config.hour.height + minute * this.config.minute.height + 0.5);
      this.ctx.lineTo(direction * this.config.sidebar.width, hour * this.config.hour.height + minute * this.config.minute.height + 0.5);
      this.renderTime(hour, minute);
    }

    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.closePath();
  }

  renderTime (hour, minute) {
    this.ctx.fillText(
      (60 / this.config.hour.minuteRows * minute) % 60,
      this.config.sidebar.width / 2,
      hour * this.config.hour.height + minute * this.config.minute.height + 15
    );
  }

  createCanvas () {
    this.canvas = Canvas.create('sidebar.' + this.side, {
      height: this.config.day.hourRows * this.config.hour.height,
      width: this.config.sidebar.width
    });

    this.ctx = Canvas.getCtx('sidebar.' + this.side);
    this.canvas.id = 'sidebar-' + this.side;
  }
}
