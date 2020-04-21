import { RenderTexture, Sprite, Texture } from 'pixi.js'
import { biasMatrix, getCameraDistance } from 'utils'

import { CameraOrtho } from '3d-tools/cameras/CameraOrtho';
import { Player } from './Player'
import { RacePanelManager } from './RacePanelManager';
import ViewGridFloor from './views/ViewGridFloor';
import { ViewSphereBg } from '../shared/views/ViewSphereBg';
import { container3D } from '3d-tools';
import gradient from 'assets/images/gradient.jpg'
import { mat4 } from 'gl-matrix';
import sky from 'assets/images/sky_gradient.jpg'

class Race {
  constructor ({devices, camera, orbitalControl, container2D, app}) {
    this.app = app;
    this.camera = camera;
    this.orbitalControl = orbitalControl;
    this.container2D = container2D;
    this.players = [];
    if (devices.length > 0) {
      for (let i = 0; i < devices.length; i++) {
        const device = devices[i];

        const player = new Player(this, 10, device);
        this.players.push(player)
      }
    } else {
      for (let i = 0; i < 2; i++) {
        const player = new Player(this, 10, null);
        this.players.push(player)

        container3D.addToShadows(player.view);
      }
    }

    // this.shadowMatrix = mat4.create();
    // this.cameraLight = new CameraOrtho();
    // this.cameraLight.ortho(-1, 1, 1, -1, 1, 100);

    // this.cameraLight.lookAt([0, 4, 0.001], [0, 0, 0]);


    // mat4.identity(this.shadowMatrix);
    // mat4.multiply(this.shadowMatrix, this.cameraLight.projection, this.cameraLight.viewMatrix);
    // mat4.multiply(this.shadowMatrix, biasMatrix, this.shadowMatrix);

    // this.renderTexture = RenderTexture.create({width: window.innerWidth, height: window.innerHeight, resolution: 1});

    // const framebuffer = this.renderTexture.baseTexture.framebuffer;
    // framebuffer.enableDepth();
    // framebuffer.addDepthTexture();

    // // const depthTexture = framebuffer.depthTexture;

    // this.sprite = new Sprite(this.renderTexture.baseTexture.depthTexture);
    this.container2D.addChild(container3D.shadow.debugSprite);
    
    this.vBackground = new ViewSphereBg(Texture.from(gradient));
    this.vGridFloor = new ViewGridFloor(this, 10);
    this.racePanelsManager = new RacePanelManager(this.players, this.vGridFloor);
    container3D.addChild(this.vBackground);
    container3D.addChild(this.vGridFloor);
    

    // container3D.addRenderListener(this.calculateShadows.bind(this))
  }

  
  onHeartbeat (hbs) {
    for (let i = 0; i < this.players.length; i++) {
      const dId = this.players[i].device;
      this.players[i].onHeartbeat(hbs[dId]); 
    }

    this.app.onPlayersUpdate.dispatch(this.players)
  }

  // calculateShadows(renderer) {
  //   container3D.render(renderer, [this.players[0].view], this.cameraLight, this.renderTexture)
  // }

  update () {

    for (let i = 0; i < this.players.length; i++) {
      if (i === 0) {
        const firstPoint = this.players[i].getFirstPoint();

        this.orbitalControl.center[0] = firstPoint[0];
		    this.orbitalControl.positionOffset[0] = firstPoint[0];
      }
      this.players[i].update(); 
    }
    this.vGridFloor.update();
    this.racePanelsManager.update();

  }

  resize (w, h) {
    // this.renderTexture.resize(w, h);
    const scaleW = getCameraDistance(this.camera, this.orbitalControl, 1, true, 0.75);
    const scaleH = getCameraDistance(this.camera, this.orbitalControl, 1, false, 1);
    

    const { width, height } = this.vGridFloor.resize(scaleW, scaleH);
    this.racePanelsManager.resize(width, height);
    

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].resize(scaleW, this.vGridFloor.nbSeconds);
    }
  }
}

export { Race };