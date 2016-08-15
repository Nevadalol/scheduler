import { Config } from '../utils/Config';

export class Appointment {
  constructor (params) {
    this.config = Config.getInstance().calendar;
    params.date = new Date(params.timestamp);

    this.params = params;
  }

  changeAppointmentTime (time) {
    this.params.date.setMinutes(time.minute);
    this.params.date.setHours(time.hour);
    this.params.date.setDate(time.day);
  }

  isSelected (coords) {
    return (this.position.y + this.position.height) > coords.y &&
           (this.position.x + this.position.width) > coords.x &&
           this.position.x < coords.x &&
           this.position.y < coords.y;
  }

  calculatePosition () {
    var time = {
          minute: this.params.date.getMinutes(),
          hour: this.params.date.getHours(),
          date: this.params.date.getDate()
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