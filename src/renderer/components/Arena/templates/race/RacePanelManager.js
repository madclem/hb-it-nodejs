import { ViewPanel } from './views/ViewPanel';
import { container3D } from '3d-tools';

class RacePanelManager {
  constructor (players, floor) {
    this.players = players;
    this.floor = floor;
    this.panels = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      let panel = new ViewPanel(player);


      setTimeout(()=>{        
        container3D.addChild(panel);
      })

      this.panels.push(panel);
    }
  }

  update () {
    for (let i = 0; i < this.panels.length; i++) {
      const panel = this.panels[i];
      panel.update();
      
    }
  }

  resize (w, h) {

    const nbPlayers = this.players.length === 1 ? 3 : this.players.length;

    for (let i = 0; i < this.panels.length; i++) {
      const panel = this.panels[i];
      panel.y = this.floor.y;
      const player = this.players[i];

      panel.resize(w, (h / nbPlayers))
    }
  }
}

export { RacePanelManager };