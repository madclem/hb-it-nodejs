// ViewLine.js

import { BaseRenderTexture, Container, Graphics, Rectangle, RenderTexture, Sprite, State, Text, TextStyle, Texture } from 'pixi.js';

import Entity3D from '3d-tools/objects/Entity3D';
import { PanelMaterial } from './materials/PanelMaterial';
import PlaneGeometry from '3d-tools/geometries/PlaneGeometry';
import { map } from 'utils';
import { renderer } from '3d-tools/Application';

class ViewPanel extends Entity3D {

	constructor(player) {
    const s = 1;
    const ratio = 16 / 9;

    const cardHeight = 140;
    const cardWidth = cardHeight * ratio;

    super({ material: new PanelMaterial(Texture.EMPTY), geometry: new PlaneGeometry(s * ratio, s, 1, 1)})

    this.ratio = ratio;

    this.rotationX = Math.PI / 2;
    this.state = new State();
    this.state.depthTest = false;

    this.player = player;


    this.container = new Container();
    
    const styleHB = new TextStyle({
      fontFamily: "PTSans-Italic",
      fontSize: 110,
      fontWeight: 300,
      fill: "#FFFFFF"
    });

    this.hbText = new Text("100", styleHB);
    this.hbText.anchor.set(0.5);
    this.hbText.scale.set(0.5);
    this.hbText.position.x = cardWidth / 2;
    this.hbText.position.y = cardHeight / 2;

    this.container.addChild(this.hbText);


    const brt = new BaseRenderTexture(cardWidth, cardHeight);
    this.renderTexture = new RenderTexture(brt, new Rectangle(0, 0, cardWidth, cardHeight));
    renderer.render(this.container, this.renderTexture, true);

    this.material.uniforms.uMap = this.renderTexture;

    this.material.uniforms.percentage = Math.random();
    this.material.uniforms.ratio = this.ratio;
	}

	update() {
    
    const hb = this.player.heartbeat || 0;

    if (this.lastHB !== hb) {
      this.hbText.text = this.player.heartbeat || 0;  
      renderer.render(this.container, this.renderTexture, true);

      let hbPercentage = hb < 50 ? 50 : hb > 195 ? 195 : hb;
      const percentage = map(hbPercentage, 50, 195, 0, 1);
      this.material.uniforms.percentage = percentage;
    
      this.lastHB = hb;
    }
  }
  
  resize (widthFloor, h) {
    this.z = this.player.view.z;
    const scale = h * 0.99;
    this.scaleX = scale;
    this.scaleY = scale;
    this.x = widthFloor / 2 - (this.scaleY * this.ratio) / 2;
  }
}

export { ViewPanel };