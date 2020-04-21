import './assets/css/fonts.css';
import './index.css';

import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { ArenaApp } from './ArenaApp';

export function Arena(props) {
  const [players, setPlayers] = useState([]);
  const location = useLocation();

  function onPlayersUpdate (playersUpdate) {
    const arrP = []
    playersUpdate.sort((a, b)=> {
      return b.heatbeat - a.heartbeat 
    })

    playersUpdate.forEach(p => {
      arrP.push({
        id: p.device ? p.device.id : Math.random() * 0xffffff,
        name: p.name,
        hb: p.heartbeat || 0,
        color: p.colorHex
      })
    });
    setPlayers(arrP)
  }
  useEffect(() => {
    console.log(location, location.state)
    // Update the document title using the browser API
    let arenaApp = new ArenaApp(location.state ? location.state.devices : []);

    let devices = []
    if (location.state) {
      devices = location.state.devices;
    } else {
      devices = [{ id: '049308540', name: 'Polar'}]
    }

    const pl = devices.map((d) => {
      return {
        id: d.id,
        name: d.name,
        hb: 0,
        color: null
      }
    })

    setPlayers(devices)


    arenaApp.onPlayersUpdate.add(onPlayersUpdate);

  }, []);

  return (
      
      <>
      <div className='link'>
        <Link to='/'>Back</Link>
      </div>
      {/* <div className='playersContainer'>
        {
          players.map((player) => {
            return (
            
              <div key={player.id} className='player' style={{ backgroundColor: player.color }}>
                <h2>{player.name}</h2>
                <p>{player.hb}</p>
              </div>
            )
          })
        }
      </div> */}
      </>
  );
}
