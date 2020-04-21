import { BaseRenderTexture, Container, Rectangle, RenderTexture, Sprite, Text } from 'pixi.js';
import { Classic, Race } from './templates';

import Application from '3d-tools/Application';
// import { Classic } from './templates';
import { HeartbeatsManager } from './HeartbeatsManager';
import Signal from 'mini-signals';
import { assets } from './assets';

export class ArenaApp extends Application {
  constructor (devices) {
    super({ backgroundColor: 0xFDFCF7});

    this.devices = devices;

    this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0;
    this.orbitalControl.radius.value = 5;
    
    this.tick = 0;
    this.container = new Container();
    this.stage.addChild(this.container);

    this.onPlayersUpdate = new Signal();

    this.loader.addFonts(["PTSans-Regular"]);
    this.loader.add(assets);
    this.loader.load();
  }

  onAssetsLoaded () {
    this.heartbeatsManager = new HeartbeatsManager(this.devices, this.onHeartbeat.bind(this));

    const options = { devices: this.devices, container2D: this.container, camera: this.camera, orbitalControl: this.orbitalControl, app: this };
    this.gameTemplate = new Race(options);

    this.resize(window.innerWidth, window.innerHeight);
  }

  onHeartbeat (hbs) {
    this.gameTemplate.onHeartbeat(hbs);
  }

  update () {
    if (!this.gameTemplate) return;
    
    this.heartbeatsManager.update();
    this.gameTemplate.update();
    
  }
  
  resize () {
    super.resize(window.innerWidth, window.innerHeight);
    this.camera.setAspectRatio(window.innerWidth / window.innerHeight);

    if (this.gameTemplate) this.gameTemplate.resize(window.innerWidth, window.innerHeight);
		
  }
}