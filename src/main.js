import { BrowserWindow, app, ipcMain } from 'electron';
import { onDeviceConnect, onDeviceDisconnect } from './main/signals';

import DevicesManager from './main/DevicesManager';
// import NobleManager from './main/NobleManager';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

let mainWindow = null;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);


  mainWindow.webContents.once('dom-ready', () => {
    console.log('DEVICE-READY');
    mainWindow.webContents.send('device-ready')
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('ready', () => {
  let isScanning = false;
  const noble = require('@abandonware/noble');
  
  // SIGNALS FROM DEVICES
  onDeviceConnect.add((id)=>{
    if (mainWindow) {
      mainWindow.webContents.send('device-ready')
    }
  });

  onDeviceDisconnect.add((id, message)=>{
    // TODO: Send signal to remove device from list when disconnected
  });


  noble.on('stateChange', function (state) {
    console.log(`noble state has changed ${state}`);
    if (state !== 'poweredOn') noble.stopScanning();
    // else noble.startScanning(['180d'], true);
  });
    
  noble.on('discover', function (peripheral) {
    // console.log('peripheral', peripheral)
    if (!peripheral.advertisement.localName || !peripheral.connectable) return;
    
    DevicesManager.addDevice(peripheral)
  });

  
  /**
   * COMMUNICATION
   */
  
  ipcMain.on('start-scanning', (event) => {
    if (isScanning) {
      event.returnValue = 'already scanning';

      mainWindow.webContents.send('device-ready')
      return;
    }
    isScanning = true;
    noble.startScanning(['180d'], true);
    event.returnValue = 'start scanning'
  })

  ipcMain.on('stop-scanning', (event) => {
    isScanning = false;
    noble.stopScanning();
    event.returnValue = 'stop scanning'
  })

  ipcMain.on('device-request', (event) => {
    console.log('DEVICE-REQUEST');
    event.returnValue = DevicesManager.devices;
  })
  
  ipcMain.on('heartbeats-devices-request', (event) => {
    event.returnValue = DevicesManager.getDevicesHB();
  });

  ipcMain.on('heartbeat-request', (event, idDevice) => {
    const result = DevicesManager.getHB(idDevice);
    console.log('HEARBEAT-REQUEST', idDevice, result);
    event.returnValue = result;
  })
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
