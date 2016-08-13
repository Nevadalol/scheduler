import { SidebarView } from './SidebarView';

export class RightSidebarView extends SidebarView {
  renderMinute (minute) {
    if (minute) {
      this.ctx.moveTo(this.config.sidebar.width / 2, minute * this.config.minute.height + 0.5);
      this.ctx.lineTo(-1 * this.config.sidebar.width, minute * this.config.minute.height + 0.5);
    }

    this.ctx.stroke();
    this.renderTime(minute);
  }

  createCanvas () {
    super.createCanvas();
    this.canvas.id = 'sidebar-right';
  }

  renderTime (minute) {
    this.ctx.fillText(
      minute * 10 % 60, 5,
      minute * this.config.minute.height + 15
    );
  }
}