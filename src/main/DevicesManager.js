import { onDeviceConnect, onDeviceDisconnect } from './signals';

import Device from './Device';

class DevicesManager {
  constructor() {
    this.devices = [];
    this.devicesIds = {};
  }

  addDevice(deviceData) {
    const id = deviceData.id
    if (this.devicesIds[id] !== undefined) {
      console.warn('device already registered');

      return;
    }


    const device = new Device(deviceData);
    device.onDisconnect.add(this.onDeviceDisconnect)
    device.onConnect.add(this.onDeviceConnect)

    const len = this.devices.push(device);
    this.devicesIds[id] = len - 1;
  }

  getDevicesHB () {
    const obj = {}

    for (let i = 0; i < this.devices.length; i++) {
      const d = this.devices[i];
      obj[d.id] = d.heartbeat;
    }

    return obj;
  }

  getHB (deviceId){
    let indexArray = this.devicesIds[deviceId]
    
    if (indexArray !== undefined) {
      console.log('here exists', this.devices[indexArray].heartbeat)
      return this.devices[indexArray].heartbeat;
    }

    return 'error';
  }

  onDeviceConnect = (deviceId) => {
    onDeviceConnect.dispatch(deviceId);
  }

  onDeviceDisconnect = (deviceId, message) => {
    if(message) console.log(`Diconnect message: ${message}`);

    let indexArray = this.devicesIds[deviceId]
    
    if (indexArray !== undefined) {

      onDeviceDisconnect.dispatch(deviceId, message);

      console.log(`disconnect device with id ${deviceId}`)
      this.devicesIds[deviceId] = undefined;
      this.devices.splice(indexArray, 1);
    }
  }
}

export default new DevicesManager();