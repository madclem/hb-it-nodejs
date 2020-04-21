// ViewLine.js
import { DRAW_MODES } from 'pixi.js';
import DiagramMaterial from './materials/GridMaterial';
import Entity3D from '3d-tools/objects/Entity3D';
import PlaneGeometry from '3d-tools/geometries/PlaneGeometry';
import { smoothstep } from 'utils';

class ViewGridFloor extends Entity3D {

	constructor(scene, nbSecondScreen) {

    const s = 1;
    super({ material: new DiagramMaterial(), geometry: new PlaneGeometry(s, s, 10, 10)})
    
    console.log('DRAW_MODES', DRAW_MODES)
    this.drawMode = DRAW_MODES.TRIANGLES;

		this.time = 0;
    this.paused = false;
    this.nbSeconds = nbSecondScreen;
    this.scene = scene;
    this.speedX = 0.01666;

    this.rotationX = Math.PI / 2;
    this.y = -1;
	}

	changeNbSeconds(seconds) {
    this.nbSeconds = seconds;

    // this.speedX = 0.01;

    this.speedX = this.scaleX / seconds * 0.01666;
  }
  
  pause () {
    this.paused = true;
  }

  resume () {
		this.paused = false;
	}


	update() {
    
    const line = this.scene.players[0].view;

    let averageY = 0

    for (let i = 0; i < this.scene.players.length; i++) {
      averageY += this.scene.players[i].getFirstPoint()[1];
    }

    averageY /= this.scene.players.length;
    if (!this.paused) {

      this.time += 1 / 60;
    }
    
      const y = averageY;
      const pY = smoothstep(0.25, 1., Math.abs(y / this.scaleY) * 2)

      this.targetY = pY * y;
		

		this.material.uniforms.uTime = this.time;
		this.material.uniforms.uNbSeconds = this.nbSeconds;
    this.material.uniforms.uLightPosition = line.points[0];
  }
  
  resize (scaleW, scaleH) {
    const nbPlayers = this.scene.players.length;

    this.material.uniforms.nbPlayers = nbPlayers === 1 ? 3 : nbPlayers;
    this.scaleX = scaleW;

    const ratioDepth = 9 / 16 * 0.45;
    this.scaleY = scaleW * ratioDepth;
    this.z = 0;

    const distanceBetweenPlayers = (this.scaleY) / nbPlayers

    for (let i = 0; i < nbPlayers; i++) {
      const player = this.scene.players[i];
      player.view.z = (nbPlayers - 1) * (this.scaleY / 2) / (nbPlayers) - i * distanceBetweenPlayers;
      
    }

    return { width: this.scaleX, height: this.scaleY };
  }


}

export default ViewGridFloor;