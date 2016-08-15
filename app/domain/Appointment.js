import { Config } from '../utils/Config';

export class Appointment {
  constructor (params) {
    this.config = Config.getInstance().calendar;
    this.params = params;

    this.date = new Date(params.timestamp);
    this.calculatePosition();
  }

  changeAppointmentTime (time) {
    this.date.setMinutes(time.minute);
    this.date.setHours(time.hour);
    this.date.setDate(time.day);
  }

  isSelected (coords) {
    return (this.position.y + this.position.height) > coords.y &&
           (this.position.x + this.position.width) > coords.x &&
           this.position.x < coords.x &&
           this.position.y < coords.y;
  }

  calculatePosition () {
    var time = {
          minute: this.date.getMinutes(),
          hour: this.date.getHours(),
          date: this.date.getDate()
        },
        today = new Date().getDate();

    this.position = {
      x: (time.date - today) * this.config.minute.width + 2,
      y: time.hour * this.config.hour.height + (this.config.hour.height / 60) * time.minute,
      width: this.config.minute.width - 4,
      height: (this.params.duration / 600000) * this.config.minute.height
    };
  }
}