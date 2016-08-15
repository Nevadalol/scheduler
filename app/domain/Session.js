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
    let collection = [].concat(appointments).map((model) => new Appointment(model));

    this.appointments = this.appointments.concat(collection);
    Mediator.publish('appointments:add');
  }
}
