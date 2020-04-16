import { CONSTS } from '../../consts';
import { ipcRenderer } from 'electron';

export class HeartbeatsManager {
  constructor (devices, onHeartbeatCallback) {
    this.onHeartbeatCallback = onHeartbeatCallback;
    this.devices = devices;
    this.frequency = CONSTS.hbFreq * 60;
    this.tick = 0;
  }

  getHearbeats() {
    const hearbeats = ipcRenderer.sendSync('heartbeats-devices-request');

    this.onHeartbeatCallback(hearbeats);
  }

  update () {
    this.tick++;

    if (this.tick % this.frequency === 0) {
      this.getHearbeats();
    }

  }
}