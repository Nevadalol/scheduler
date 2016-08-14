import { Mediator } from './Mediator';
import { Config } from './Config';
import { Canvas } from './Canvas';

export class MouseEvents {
  constructor () {
    this.config = Config.getInstance();
    this.attachEvents();
  }

  attachEvents () {
    Canvas.get('calendar').addEventListener('mousemove', this.onMouseMove, false);
    Canvas.get('calendar').addEventListener('mousedown', this.onMouseDown, false);
    // TODO: attach to document/body
    Canvas.get('calendar').addEventListener('mouseup', this.onMouseUp, false);
  }

  detachEvents () {
    Canvas.get('calendar').removeEventListener('mousemove', this.onMouseMove);
    Canvas.get('calendar').removeEventListener('mousedown', this.onMouseDown);
    Canvas.get('calendar').removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove (e) {
    Mediator.publish('calendar:mousemove', {x: e.offsetX, y: e.offsetY});
  }

  onMouseDown (e) {
    Mediator.publish('calendar:mousedown', {x: e.offsetX, y: e.offsetY});
  }

  onMouseUp (e) {
    Mediator.publish('calendar:mouseup', {x: e.offsetX, y: e.offsetY});
  }
}
