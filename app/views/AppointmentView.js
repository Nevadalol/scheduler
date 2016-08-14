import _ from '../../node_modules/underscore';
import { Session } from '../domain/Session';
import { Mediator } from '../utils/Mediator';
import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';
import { Util } from '../utils/Util';

export class AppointmentView {
  constructor (params) {
    this.collection = Session.getInstance();
    this.config = Config.getInstance().calendar;
    this.ctx = Canvas.getCtx('calendar');

    this.appointmentDate = new Date(params.timestamp);
    this.params = params;

    this.calculatePosition();

    Mediator.subscribe('calendar:mousemove', this.getMousePosition, this);
    Mediator.subscribe('calendar:mousedown', this.onMousedown, this);
    Mediator.subscribe('calendar:mouseup', this.onMouseup, this);
  }

  render () {
    this.ctx.fillStyle = this.params.headerColor;
    this.ctx.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
  }

  moveAppointment () {
    this.ctx.clearRect(this.position.x, this.position.y, this.position.width, this.position.height);

    if (this.isMoving) {
      this.position.x += this.mousePosition.x - this.position.x;
      this.position.y += this.mousePosition.y - this.position.y;
    }

    Mediator.publish('calendar:render');
    _.invoke(this.collection.appointments, 'render');

    this.animationFrame = requestAnimationFrame(this.moveAppointment.bind(this));
  }

  getMousePosition (coords) {
    this.mousePosition = coords;
  }

  onMousedown (coords) {
    if (this.isAppointmentSelected(coords)) {
      this.isMoving = true;

      setTimeout(() => {
        if (this.isMoving) {
          this.hasMoved = true;
          this.moveAppointment();
        }
      }, this.config.moveDelay);
    }
  }

  onMouseup (coords) {
    if (this.hasMoved) {
      cancelAnimationFrame(this.animationFrame);
      this.placeAppointment(coords);
      this.hasMoved = false;
    }

    this.isMoving = false;

    Mediator.publish('calendar:render');
    _.invoke(this.collection.appointments, 'render');
  }

  placeAppointment (coords) {
    this.ctx.clearRect(this.position.x, this.position.y, this.position.width, this.position.height);
    this.changeAppointmentTime(coords);
    this.calculatePosition();
  }

  changeAppointmentTime (coords) {
    var time = Util.getTime(coords.x, coords.y);

    this.appointmentDate.setMinutes(time.minute);
    this.appointmentDate.setHours(time.hour);
    this.appointmentDate.setDate(time.day);
  }

  isAppointmentSelected (coords) {
    return (this.position.y + this.position.height) > coords.y &&
           (this.position.x + this.position.width) > coords.x &&
           this.position.x < coords.x &&
           this.position.y < coords.y;
  }

  calculatePosition () {
    var time = {
          minute: this.appointmentDate.getMinutes(),
          hour: this.appointmentDate.getHours(),
          date: this.appointmentDate.getDate()
        },
        today = new Date().getDate();

    this.position = {
      x: (time.date - today) * this.config.minute.width + 2,
      y: time.hour * this.config.hour.height + (this.config.hour.height / 60) * time.minute,
      width: this.config.minute.width - 4,
      height: (this.params.duration / 600000) * this.config.minute.height
    };
  }
}
