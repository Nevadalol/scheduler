import { Mediator } from './Mediator';
import { Config } from './Config';
import { Canvas } from './Canvas';
import { Util } from './Util';

export class MouseEvents {
  constructor () {
    this.config = Config.getInstance();
    this.attachEvents();

    Mediator.subscribe('Appointment.moveStop', this.onMouseStop);
    Mediator.subscribe('Appointment.moveStart', this.onMouseMove);
  }

  attachEvents () {
    Canvas.get('calendar').addEventListener('mousedown', this.onMousedown, false);
    Canvas.get('calendar').addEventListener('dblclick', this.onDblclick, false);
    Canvas.get('calendar').addEventListener('mouseup', this.onMouseup, false);
  }

  onMouseMove (clb) {
    Canvas.get('calendar').addEventListener('mousemove', clb, false);
  }

  onMouseStop (clb) {
    Canvas.get('calendar').removeEventListener('mousemove', clb);
  }

  detachEvents () {
    Canvas.get('calendar').removeEventListener('mousedown', this.onMousedown);
    Canvas.get('calendar').removeEventListener('dblclick', this.onDblclick);
    Canvas.get('calendar').removeEventListener('mouseup', this.onMouseup);
  }

  onDblclick (e) {
    Mediator.publish('Calendar.dblclick', e);
  }

  onMousedown (e) {
    Mediator.publish('Calendar.mousedown', e);
  }

  onMouseup (e) {
    Mediator.publish('Calendar.mouseup', e);
  }
}
