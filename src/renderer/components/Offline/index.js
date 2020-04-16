import React, { useEffect, useRef, useState } from 'react';

import { Link } from "react-router-dom";
import { useInterval } from '../../hooks/useInterval'

const { ipcRenderer } = require('electron')

export default function Offline () {
  const [count, setCount] = useState(0);
  const [hearbeats, setHearbeats] = useState([]);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);


  function getDevices () {
    const devices = ipcRenderer.sendSync('device-request');
    setDiscoveredDevices(devices);
  }

  useInterval(() => {
    const hbs = []
    discoveredDevices.forEach((d)=>{
      const heartbeat = ipcRenderer.sendSync('heartbeat-request', d.id);
      hbs.push(heartbeat);
    })

    setHearbeats(hbs);
  }, 1000);

  useEffect(() => {   
    // tell server to start scanning
    const res = ipcRenderer.sendSync('start-scanning');
    console.log('res', res);

    ipcRenderer.on('device-ready', (event) => {
      getDevices();
    })

    // TODO: use signal.onDeviceDisconnect() from main to remove devie from list
  
  }, [])

  return (
    <div> 
      <Link to="/back">Back</Link>
      <h2>Offline</h2>
      <p>Plug in your heart sensors and press start when ready.</p>

      <div>
        <p>Connected devices:</p>
        <ul>
          { discoveredDevices.map((device, i) => (
            <li key={device.id}>{device.localName} - {hearbeats[i]}</li>
          ))}
        </ul>

        <Link to={{
          pathname: "/arena",
          state: {
            devices: discoveredDevices
          }
        }}>Start</Link>

      </div>
    </div>
  )
}