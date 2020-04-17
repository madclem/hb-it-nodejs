import { BaseRenderTexture, Container, Rectangle, RenderTexture, Sprite, Text } from 'pixi.js';

import Application from '../../3d-tools/Application';
import { Classic } from './templates';
import { HeartbeatsManager } from './HeartbeatsManager';

export class ArenaApp extends Application {
  constructor (devices) {
    super();

    this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0;
    this.orbitalControl.radius.value = 5;
    
    this.tick = 0;
    this.container = new Container();
    this.stage.addChild(this.container);

    this.heartbeatsManager = new HeartbeatsManager(devices, this.onHeartbeat.bind(this));

    const options = { devices, container2D: this.container, camera: this.camera, orbitalControl: this.orbitalControl };
    this.gameTemplate = new Classic(options);
  }

  onHeartbeat (hbs) {
    this.gameTemplate.onHeartbeat(hbs);
  }

  update () {
    this.heartbeatsManager.update();
    this.gameTemplate.update();
    
  }
  
  resize () {
    super.resize(window.innerWidth, window.innerHeight);
    this.camera.setAspectRatio(window.innerWidth / window.innerHeight);

    this.gameTemplate.resize(window.innerWidth, window.innerHeight);
		
  }
}