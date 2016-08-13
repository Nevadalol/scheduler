import _ from '../../node_modules/underscore';
import { AppointmentsCollection } from '../domain/AppointmentsCollection';
import { Mediator } from '../utils/Mediator';
import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';
import { Util } from '../utils/Util';

export class AppointmentView {
  constructor (params) {
    this.collection = AppointmentsCollection.getInstance();
    this.config = Config.getInstance().calendar;
    this.ctx = Canvas.getCtx('calendar');

    this.onMouseMove = this.getMoveHandler();
    this.date = new Date(params.timestamp);
    this.params = params;

    this.calculatePosition();

    Mediator.subscribe('Calendar.mousedown', this.onMousedown, this);
    Mediator.subscribe('Calendar.mouseup', this.onMouseup, this);
  }

  render () {
    this.ctx.fillStyle = this.params.headerColor;
    this.ctx.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
  }

  moveAppointment (event) {
    this.ctx.clearRect(this.position.x, this.position.y, this.position.width, this.position.height);

    if (this.isMoving) {
      this.position.x += event.offsetX - this.position.x;
      this.position.y += event.offsetY - this.position.y;
    }

    Mediator.publish('Calendar.renderWeek');
    _.invoke(this.collection.appointments, 'render');
  }

  onMousedown (e) {
    if (this.isAppointmentSelected({x: e.offsetX, y: e.offsetY})) {
      this.isMoving = true;

      setTimeout(function () {
        if (this.isMoving) {
          Mediator.publish('Appointment.moveStart', this.onMouseMove);
          this.hasMoved = true;
        }
      }.bind(this), this.config.moveDelay);
    }
  }

  onMouseup (e) {
    if (this.hasMoved) {
      Mediator.publish('Appointment.moveStop', this.onMouseMove);
      this.placeAppointment({x: e.offsetX, y: e.offsetY});
      this.hasMoved = false;
    }

    this.isMoving = false;

    Mediator.publish('Calendar.renderWeek');
    _.invoke(this.collection.appointments, 'render');
  }

  getMoveHandler () {
    return _.throttle(this.moveAppointment.bind(this), 1000/60);
  }

  placeAppointment (coords) {
    this.ctx.clearRect(this.position.x, this.position.y, this.position.width, this.position.height);
    this.changeAppointmentTime(coords);
    this.calculatePosition();
  }

  changeAppointmentTime (coords) {
    var time = Util.getTime(coords.x, coords.y);

    this.date.setMinutes(time.minute);
    this.date.setHours(time.hour);
    this.date.setDate(time.day);
  }

  isAppointmentSelected (coords) {
    return (this.position.y + this.position.height) > coords.y &&
           (this.position.x + this.position.width) > coords.x &&
           this.position.x < coords.x &&
           this.position.y < coords.y;
  }

  calculatePosition () {
    var time = {
          minute: this.date.getMinutes(),
          hour: this.date.getHours(),
          date: this.date.getDate()
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
