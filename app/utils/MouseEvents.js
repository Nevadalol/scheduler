import { Mediator } from './Mediator';
import { Config } from './Config';
import { Canvas } from './Canvas';

export class MouseEvents {
  constructor () {
    this.config = Config.getInstance();
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new MouseEvents();
    }

    return this.instance;
  }

  addEventListeners () {
    // TODO: leak
    Canvas.get('calendar').addEventListener('mousemove', this.onMouseMove.bind(this), false);
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
    this.mouseCoords = {x: e.offsetX, y: e.offsetY};
  }

  onMouseDown (e) {
    Mediator.publish('calendar:mousedown', {x: e.offsetX, y: e.offsetY});
  }

  onMouseUp (e) {
    Mediator.publish('calendar:mouseup', {x: e.offsetX, y: e.offsetY});
  }
}
