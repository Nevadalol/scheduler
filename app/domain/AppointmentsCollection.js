import _ from '../../node_modules/underscore';
import { AppointmentView } from '../views/AppointmentView';
import { Mediator } from '../utils/Mediator';

export class AppointmentsCollection {
  constructor () {
    this.appointments = [];

    Mediator.subscribe('Appointment.add', this.add, this);
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new AppointmentsCollection();
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
