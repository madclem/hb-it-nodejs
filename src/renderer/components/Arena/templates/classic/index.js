import { Player } from './Player';
import { PlayersCardsManager } from './PlayersCardsManager'
import ViewDiagramBg from './views/ViewDiagramBg';
import { container3D } from '3d-tools';
import { getCameraDistance } from 'utils';

class Classic {
  constructor ({devices, camera, orbitalControl, container2D}) {
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
      const player = new Player(this, 10, null);
      this.players.push(player)
    }

    this.playersCardsManager = new PlayersCardsManager(this.players, this);
    this.vDiagramBg = new ViewDiagramBg(this, 10);
    container3D.addChild(this.vDiagramBg);
  }

  
  onHeartbeat (hbs) {
    for (let i = 0; i < this.players.length; i++) {
      const dId = this.players[i].device;
      this.players[i].onHeartbeat(hbs[dId]); 
    }
  }

  update () {
    this.playersCardsManager.update();

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

  resize (w, h) {
    const scaleW = getCameraDistance(this.camera, this.orbitalControl, 1, true, 1);
		const scaleH = getCameraDistance(this.camera, this.orbitalControl, 1, false, 1);
		this.vDiagramBg.scaleX = scaleW;
		this.vDiagramBg.scaleY = scaleH;

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].resize(scaleW, this.vDiagramBg.nbSeconds);
    }
  }
}

export { Classic };