import { DiffuseMaterial } from '3d-tools/materials/DiffuseMaterial';
import Entity3D from '3d-tools/objects/Entity3D';
import SphereGeometry from '3d-tools/geometries/SphereGeometry';
// ViewLine.js
import { Texture } from 'pixi.js';
import { smoothstep } from 'utils';

class ViewSphereBg extends Entity3D {

	constructor(map) {
    console.log(map)
    super({ material: new DiffuseMaterial(map || Texture.EMPTY), geometry: new SphereGeometry(10, 10, 10)})
	}

	
	update() {  
  }
  
  resize () {
  }


}

export { ViewSphereBg };