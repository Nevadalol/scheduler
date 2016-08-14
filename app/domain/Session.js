import _ from '../../node_modules/underscore';
import { AppointmentView } from '../views/AppointmentView';
import { Mediator } from '../utils/Mediator';

export class Session {
  constructor () {
    this.appointments = [];
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new Session();
    }

    return this.instance;
  }

  add (appointments) {
    this.appointments = this.appointments.concat(
      [].concat(appointments).map(this.createAppointment, this)
    );
  }

  createAppointment (appointment) {
    var instance = new AppointmentView(appointment);

    _.defer(() => instance.render());

    return instance;
  }
}
