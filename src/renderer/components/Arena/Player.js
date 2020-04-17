import ViewLine from './views/ViewLine';
import { container3D } from '../../3d-tools';

export class Player {
  constructor (scene, seconds, device) {
    this.device = device ? device.id : null;
    this.color = Math.random() * 0xffffff;

    this.name = device ? device.localName : "John Doe";
    this.heartbeat = 0;

    this.vLine = new ViewLine(this.color);
    container3D.addChild(this.vLine);
  }

  get line () {
    return this.vLine;
  }

  onHeartbeat (hb) {
    this.heartbeat = hb;
    this.vLine.onHeartbeat(hb);
  }

  getFirstPoint () {
    return this.vLine.points[0];
  }

  update () {
    this.vLine.update();
  }

  resize (scaleW, nbSeconds) {
    this.vLine.changeSpeed(scaleW, nbSeconds);
  }
}