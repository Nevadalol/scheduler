let canvases = {};

export class Canvas {
  static create (type, options) {
    var canvas = document.createElement('canvas');

    canvas.height = options.height;
    canvas.width = options.width;
    canvases[type] = canvas;

    return canvas;
  }

  static get (type) {
    return canvases[type];
  }

  static getCtx (type) {
    return canvases[type].getContext('2d');
  }
}
