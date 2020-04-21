import ViewPlayer from './views/ViewPlayer';
import { container3D } from '3d-tools';

export class Player {
  constructor ({scene, seconds, device}) {
    this.device = device ? device.id : null;

    this.name = device ? device.localName : "John Doe";
    this.heartbeat = 0;
 
    this.color = Math.random() * 0xFFFFFF;
    this.view = new ViewPlayer(this.color);
    container3D.addChild(this.view);
  }

  get line () {
    return this.view;
  }

  get z () {
    return this.view.z;
  }

  onHeartbeat (hb) {
    this.heartbeat = hb;
    this.view.onHeartbeat(hb);
  }

  getFirstPoint () {
    return this.view.points[0];
  }

  update () {
    this.view.update();
  }

  resize (scaleW, nbSeconds) {
    this.view.changeSpeed(scaleW, nbSeconds);
  }
}