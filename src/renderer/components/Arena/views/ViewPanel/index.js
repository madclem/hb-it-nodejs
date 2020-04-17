// ViewLine.js

import { DiffuseMaterial } from '../../../../3d-tools/materials/DiffuseMaterial';
import Entity3D from '../../../../3d-tools/objects/Entity3D';
import PlaneGeometry from '../../../../3d-tools/geometries/PlaneGeometry';
import { smoothstep } from '../../../../utils';

export class ViewPanel extends Entity3D {

	constructor(uMap) {
    const s = 1;
    super({ material: new DiffuseMaterial(uMap), geometry: new PlaneGeometry(s, s, 1, 1)})

    this.rotationY = -45 * Math.PI / 180;
	}

	update() {
	}
}