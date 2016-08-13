import { SidebarView } from './SidebarView';

export class LeftSidebarView extends SidebarView {
  renderMinute (minute) {
    if (minute) {
      this.ctx.moveTo(this.config.sidebar.width / 2, + minute * this.config.minute.height + 0.5);
      this.ctx.lineTo(this.config.sidebar.width, minute * this.config.minute.height + 0.5);
    }

    this.ctx.stroke();
    this.renderTime(minute);
  }

  createCanvas () {
    super.createCanvas();
    this.canvas.id = 'sidebar-left';
  }

  renderTime (minute) {
    this.ctx.fillText(
      minute * 10 % 60,
      this.config.sidebar.width / 2,
      minute * this.config.minute.height + 15
    );
  }
}