import Signal from 'mini-signals';

export default class Device {
  constructor(peripheral) {

    this.onDisconnect = new Signal();
    this.onConnect = new Signal();
    
    console.log(`peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable ${peripheral.connectable}, RSSI ${peripheral.rssi}:`);
    console.log(`localName: ${peripheral.advertisement.localName}`);
    
    this.peripheral = peripheral;
    this.localName = peripheral.advertisement.localName;
    this.id = peripheral.id;
    this.heartbeat = null;
    
    const serviceUUID = ["180d"];
    const characteristicUUID = ["2a37"];

    

    this.peripheral.connect((error) => {

      if (this.processError(error)) return;

      this.peripheral.discoverSomeServicesAndCharacteristics(serviceUUID, characteristicUUID, (error, services, characteristics) => {
        if (this.processError(error)) return;

        characteristics[0].notify(true, (error) => {
          if (this.processError(error)) return;

          this.onConnect.dispatch();
          characteristics[0].on('data', this.onUpdate);
        });
      });
    })

    this.peripheral.once('disconnect', (error) => {
      if (error) {
        const err = `Error disconnecting from this.peripheral ${this.peripheral.advertisement.localName}: ${error}`;
        console.log(err);
        return;
      }

      console.info(`${this.localName} disconnected.`);
      this.onDisconnect.dispatch(this.id);
    });
  }

  processError(error) {
    if (error) {
      this.disconnect(error);

      return true;
    }

    return false;
  }

  disconnect (message) {
    this.onDisconnect.dispatch(this.id, message);
    this.peripheral.disconnect();
  }

  onUpdate = (data, isNotification) => {
    console.log(data[1])
    this.heartbeat = data[1];
  }
}