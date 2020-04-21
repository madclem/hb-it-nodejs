// ViewLine.js

import { BaseRenderTexture, Container, Graphics, Rectangle, RenderTexture, Sprite, State, Text, TextStyle, Texture } from 'pixi.js';

import { DiffuseMaterial } from '3d-tools/materials/DiffuseMaterial';
import Entity3D from '3d-tools/objects/Entity3D';
import PlaneGeometry from '3d-tools/geometries/PlaneGeometry';
import { renderer } from '3d-tools/Application';
import { smoothstep } from 'utils';

export class ViewPlayerCard extends Entity3D {

	constructor(player) {
    const s = 1;
    super({ material: new DiffuseMaterial(Texture.EMPTY), geometry: new PlaneGeometry(s, s, 1, 1)})

    this.state = new State();
    this.state.depthTest = false;

    this.player = player;

    const cardWidth = 220;
    const cardHeight = 140;

    this.container = new Container();
    this.bg = new Graphics();
    this.bg.beginFill(0x041834);
    this.bg.drawRoundedRect(0, 0, cardWidth, cardHeight, 16);
    this.bg.alpha = 0.6;

    this.container.addChild(this.bg);

    const styleName = new TextStyle({
      fontFamily: "Verdana",
      fontSize: 20,
      fontWeight: 600,
      fill: "#3DE2B2",
      fontWeight: cardWidth / 2,
      wordWrap: true,
      breakWords: true
    });

    const name = new Text(this.player.name.substring(0, 14), styleName);
    name.anchor.set(0, 0.5);
    name.position.x = 10;
    name.position.y = cardHeight / 3

    this.container.addChild(name);
    
    const styleHB = new TextStyle({
      fontFamily: "Verdana",
      fontSize: 35,
      fontWeight: 100,
      fill: "#3DE2B2"
    });

    this.hbText = new Text("100", styleHB);
    this.hbText.anchor.set(0.5);
    this.hbText.position.x = cardWidth - this.hbText.width / 2 - 20;
    this.hbText.position.y = this.hbText.height / 2 + 20;

    console.log(this.hbText)
    this.container.addChild(this.hbText);

    this.bar = new Graphics();
    this.bar.beginFill(this.player.color).drawRect(0, 0, cardWidth - 10 * 2, 20);
    this.bar.position.x = (cardWidth - this.bar.width) / 2;
    this.bar.position.y = cardHeight - this.bar.height - 20;
    this.container.addChild(this.bar);


    const brt = new BaseRenderTexture(cardWidth + 10, cardWidth + 10);

    this.renderTexture = new RenderTexture(brt, new Rectangle(0, 0, cardWidth + 10, cardWidth + 10));
    renderer.render(this.container, this.renderTexture, true);

    this.material.uniforms.uMap = this.renderTexture;


    this.rotationY = 25 * Math.PI / 180;
	}

	update() {
    
    const hb = this.player.heartbeat || 0;

    if (this.lastHB !== hb) {
      this.hbText.text = this.player.heartbeat || 0;

      if (hb > 185) {
        this.hbText.style.fill = 0x892b00;
      } else if (hb > 175) {
        this.hbText.style.fill = 0xce4404;
      } else if (hb > 160) {
        this.hbText.style.fill = 0xceb604;
      } else if (hb > 160) {
        this.hbText.style.fill = 0xdddd00;
      } else {
        this.hbText.style.fill = 0x5ecc04;
      }
  
      renderer.render(this.container, this.renderTexture, true);
    
      this.lastHB = hb;
    }
	}
}