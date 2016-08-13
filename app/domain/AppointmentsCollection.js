import _ from '../../node_modules/underscore';
import { AppointmentView } from '../views/AppointmentView';
import { Mediator } from '../utils/Mediator';

export class AppointmentsCollection {
  constructor () {
    this.appointments = [];

    Mediator.subscribe('AppointmentsCollection.render', this.render, this);
    Mediator.subscribe('Appointment.add', this.add, this);
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new AppointmentsCollection();
    }

    return this.instance;
  }

  render () {
    _.invoke(this.appointments, 'render');
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
