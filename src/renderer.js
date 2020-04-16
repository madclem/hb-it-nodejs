/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

import {
  Link,
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';

import { Arena } from './renderer/components/Arena'
import Home from './renderer/components/Home'
import Offline from './renderer/components/Offline'
import ReactDOM from 'react-dom';

let devices = []
// const noble = require('@abandonware/noble');
// console.log('noble', noble.startScanning)
// const { ipcRenderer } = require('electron')


function App () {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/offline">
            <Offline />
          </Route>
          <Route path="/arena">
            <Arena />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );

  // const [hearbeats, setHearbeats] = useState([]);

  // function checkHeartbeats () {
  //   const arr = []
  //   devices.forEach((d)=>{
  //     const heartbeat = ipcRenderer.sendSync('heartbeat-request', d.id);
  //     arr.push(heartbeat);
  //   })

  //   setHearbeats(arr);
  // }

  // useEffect(() => { 
  //   console.log(ipcRenderer.sendSync('synchronous-message', 'ping'))   

  //   setInterval(()=>{
  //     checkHeartbeats();
  //   }, 1000);

  //   ipcRenderer.on('device-ready', (event) => {
  //     console.log('DEVICE-READY RECEIVED');
  //     devices = event.sender.sendSync('device-request');

  //     const arr = []
  //     devices.forEach(d => {
  //       arr.push(0);
  //     })

  //     setHearbeats(arr);
  //   })

  // }, [])


  // return (
  //   <div className="test">
  //     {
  //       devices.map((device, i)=>{
  //         return (<li key={device.id}>{device.localName}: <span>{ hearbeats[i]}</span></li>)
  //       })
  //     }

  //   </div>
  // )
}

ReactDOM.render(<App />, document.getElementById('app'))


