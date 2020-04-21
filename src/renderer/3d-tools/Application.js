import { Application } from 'pixi.js'
import CameraPerspective from './cameras/CameraPerspective';
import OrbitalControl from './helpers/OrbitalControl';
import { ResourceManager } from './loader'
import { container3D } from '.'
import { mat4 } from 'gl-matrix'

export let renderer = null;

export default class App {
  constructor (options = {}) {
    this._matrixIdentity = mat4.create();

    this.app = new Application({
      width: window.innerWidth, height: window.innerHeight, backgroundColor: options.backgroundColor || 0x1099bb, resolution: 1, antialias: true
    });
    renderer = this.app.renderer;
    document.body.appendChild(this.app.view);
    this.stage = this.app.stage;

    // set camera
    this.camera = new CameraPerspective();
    this.camera.setPerspective(45 * Math.PI / 180, window.innerWidth / window.innerHeight, 0.01, 1000);
		this.orbitalControl          = new OrbitalControl(this.camera, window, 15);
		this.orbitalControl.radius.value = 10;
    
    this.app.ticker.add(this.update.bind(this));
    
    window.addEventListener('resize', this.resize.bind(this))

    container3D.init(this.stage);
    container3D.setCamera(this.camera);
    container3D.setRenderer(renderer);



    this.loader = new ResourceManager();
    this.loader.onProgress.add(this.onProgress.bind(this));
    this.loader.onComplete.add(this.onAssetsLoaded.bind(this));

    setTimeout(()=>{
      this.resize(window.innerWidth, window.innerHeight);
    }, 10)
  }

  onProgress () {
  }

  onAssetsLoaded () {

  }

  update() {
	}

  resize(w, h) {
    renderer.resize(w, h);
	}
}