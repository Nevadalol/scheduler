import _ from '../../node_modules/underscore';
import { Config } from '../utils/Config';

export class SidebarView {
  constructor () {
    this.config = Config.getInstance().calendar;
  }

  render () {
    this.createCanvas();
    _.defer(() => this.renderColumn());

    return this;
  }

  renderColumn () {
    this.ctx.beginPath();

    this.ctx.strokeStyle = this.config.style.sidebar.borderColor;
    this.ctx.font = this.config.style.sidebar.font;

    this.ctx.strokeRect(0.5, 0.5, this.config.sidebar.width, this.config.day.hourRows * this.config.hour.height);
    this.renderHours();

    this.ctx.closePath();
  }

  renderHours () {
    for (var hour = 0; hour < this.config.day.hourRows; hour++) {
      this.ctx.beginPath();

      this.renderHour(hour);
      this.ctx.translate(0, this.config.hour.height);

      this.ctx.closePath();
    }
  }

  renderHour (hour) {
    this.ctx.strokeStyle = this.config.style.sidebar.borderColor;
    this.ctx.moveTo(0, this.config.hour.height + 0.5);
    this.ctx.lineTo(this.config.sidebar.width, this.config.hour.height + 0.5);
    this.ctx.stroke();

    this.renderMinutes(hour);
  }

  renderMinutes (hour) {
    this.ctx.strokeStyle = this.config.style.minute.borderColor;
    this.ctx.fillStyle = this.config.style.sidebar.minuteColor;

    for (var minute = 0; minute < this.config.hour.minuteRows; minute++) {
      this.ctx.beginPath();

      if (minute !== this.config.hour.minuteRows / 2) {
        this.ctx.setLineDash([1, 1]);
      }

      this.renderMinute(minute);

      this.ctx.setLineDash([]);
      this.ctx.closePath();
    }
  }

  createCanvas () {
    this.canvas = document.createElement('canvas');
    this.canvas.height = this.config.day.hourRows * this.config.hour.height + 1;
    this.canvas.width = this.config.sidebar.width + 1;
    this.ctx = this.canvas.getContext('2d');
  }
}
