import { Session } from '../domain/Session';
import { AppointmentView } from './AppointmentView';
import { Mediator } from '../utils/Mediator';

export class AppointmentsView {
  constructor () {
    Mediator.subscribe('appointments:add', this.renderAppointments, this);
  }

  renderAppointments () {
    Session.getInstance().appointments.forEach(this.renderAppointment);
  }

  renderAppointment (appointment) {
    new AppointmentView(appointment).render();
  }
}
