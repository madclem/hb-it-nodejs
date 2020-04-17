import { ViewPlayerCard } from './views/ViewPlayerCard';
import { container3D } from '../../3d-tools';

export class PlayersCardsManager {
  constructor(players, scene) {
    this.scene = scene;
    this.players = players;
    this.playersCards = [];

    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      const playerCard = new ViewPlayerCard(player);

      setTimeout(()=>{

        container3D.addChild(playerCard)
      })
      this.playersCards.push(playerCard);
      playerCard.z = 0.4;

      
    }
  }

  update () {
    // const firstPoint = 
    for (let i = 0; i < this.playersCards.length; i++) {
      const card = this.playersCards[i];
      card.x = this.scene.vDiagramBg.x - this.scene.vDiagramBg.scaleX / 3;
      card.y = this.scene.vDiagramBg.y + this.scene.vDiagramBg.scaleY / 4 - this.scene.vDiagramBg.scaleY / 2 * i;

      if (i === 0) {
        card.y -= 0.5
      }
      card.update();
    }
  }
}