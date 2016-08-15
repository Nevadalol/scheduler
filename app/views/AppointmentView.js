import { MouseEvents } from '../utils/MouseEvents';
import { Mediator } from '../utils/Mediator';
import { Config } from '../utils/Config';
import { Canvas } from '../utils/Canvas';
import { Util } from '../utils/Util';

export class AppointmentView {
  constructor (model) {
    this.mouseEvents = MouseEvents.getInstance();
    this.ctx = Canvas.getCtx('calendar');

    this.appointment = model;

    Mediator.subscribe('calendar:mousedown', this.onMousedown, this);
    Mediator.subscribe('calendar:mouseup', this.onMouseup, this);
    Mediator.subscribe('appointment:render', this.render, this);
  }

  render () {
    let position = this.appointment.position;

    this.ctx.fillStyle = this.appointment.params.headerColor;
    this.ctx.fillRect(position.x, position.y, position.width, position.height);
  }

  moveAppointment () {
    let position = this.appointment.position;

    this.ctx.clearRect(position.x, position.y, position.width, position.height);

    if (this.isMoving) {
      position.x += this.mouseEvents.mouseCoords.x - position.x;
      position.y += this.mouseEvents.mouseCoords.y - position.y;
    }

    Mediator.publish('calendar:render');
    Mediator.publish('appointment:render');
    this.render();

    this.animationFrame = requestAnimationFrame(this.moveAppointment.bind(this));
  }

  onMousedown (coords) {
    if (this.appointment.isSelected(coords)) {
      this.isMoving = true;
      setTimeout(() => this.isMoving && this.moveAppointment(), Config.getInstance().calendar.appointment.moveDelay);
    }
  }

  onMouseup (coords) {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.placeAppointment(coords);
      this.animationFrame = null;
    }

    this.isMoving = false;

    Mediator.publish('calendar:render');
    Mediator.publish('appointment:render');
  }

  placeAppointment (coords) {
    let position = this.appointment.position;

    this.ctx.clearRect(position.x, position.y, position.width, position.height);
    this.appointment.changeAppointmentTime(Util.getTime(coords.x, coords.y));
    this.appointment.calculatePosition();
  }
}
