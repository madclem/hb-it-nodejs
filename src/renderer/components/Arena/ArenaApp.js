import { Container, Text } from 'pixi.js';

import Application from '../../3d-tools/Application';
import { HeartbeatsManager } from './HeartbeatsManager';
import { Player } from './Player';
import ViewDiagramBg from './views/ViewDiagramBg';
import { container3D } from '../../3d-tools';
import { getCameraDistance } from '../../utils'

export class ArenaApp extends Application {
  constructor (devices) {
    super();

    this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0;
    this.orbitalControl.radius.value = 5;
    
    this.tick = 0;
    this.container = new Container();
    this.stage.addChild(this.container);

    this.heartbeatsManager = new HeartbeatsManager(devices, this.onHeartbeat.bind(this));

    this.players = [];
    if (devices.length > 0) {
      for (let i = 0; i < devices.length; i++) {
        const device = devices[i];

        const player = new Player(this, 10, device.id);
        this.players.push(player)
      }
    } else {
      const player = new Player(this, 10, null);
      this.players.push(player)
    }

    this.vDiagramBg = new ViewDiagramBg(this, 10);
    container3D.addChild(this.vDiagramBg);
  }

  onHeartbeat (hbs) {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].onHeartbeat(); 
    }
  }

  update () {
    this.heartbeatsManager.update();

    for (let i = 0; i < this.players.length; i++) {
      if (i === 0) {
        const firstPoint = this.players[i].getFirstPoint();

        this.orbitalControl.center[0] = firstPoint[0];
		    this.orbitalControl.positionOffset[0] = firstPoint[0];
      }
      this.players[i].update(); 
    }
    this.vDiagramBg.update();
  }
  
  resize () {
    super.resize(window.innerWidth, window.innerHeight);
    this.camera.setAspectRatio(window.innerWidth / window.innerHeight);
		const scaleW = getCameraDistance(this.camera, this.orbitalControl, 1, true, 1);
		const scaleH = getCameraDistance(this.camera, this.orbitalControl, 1, false, 1);
		this.vDiagramBg.scaleX = scaleW;
		this.vDiagramBg.scaleY = scaleH;

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].resize(scaleW, this.vDiagramBg.nbSeconds);
    }
  }
}