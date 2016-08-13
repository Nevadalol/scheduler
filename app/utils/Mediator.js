let channels = {};

export class Mediator {
  static subscribe (channel, clb, ctx) {
    if (!channels[channel]) {
      channels[channel] = [];
    }

    channels[channel].push(clb.bind(ctx));
  }

  static publish (channel) {
    var args = Array.prototype.slice.call(arguments, 1);

    if (!channels[channel]) {
      return false;
    }

    channels[channel].forEach(function (clb) {
      clb.apply(clb, args);
    });
  }

  static clear () {
    channels = {};
  }
}
