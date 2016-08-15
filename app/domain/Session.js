import _ from '../../node_modules/underscore';
import { AppointmentView } from '../views/AppointmentView';
import { Appointment } from '../domain/Appointment';
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
    this.appointments = this.appointments.concat([].concat(appointments));
    Mediator.publish('appointments:add');
  }
}
