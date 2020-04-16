import ViewLine from './views/ViewLine';
import { container3D } from '../../3d-tools';

export class Player {
  constructor (scene, seconds, device) {
    this.device = device;

    this.vLine = new ViewLine(device);
    container3D.addChild(this.vLine);
  }

  get line () {
    return this.vLine;
  }

  onHeartbeat (hb) {
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