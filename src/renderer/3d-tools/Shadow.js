import { BaseTexture, DRAW_MODES, Framebuffer, MIPMAP_MODES, Sprite, State, TYPES, Texture, UniformGroup } from 'pixi.js';
import { mat4, vec3 } from 'gl-matrix';

import { CameraOrtho } from './cameras/CameraOrtho';
import { ShadowMaterial } from './materials/ShadowMaterial';
import { biasMatrix } from 'utils';

export class Shadow {
  constructor () {

    this.identityMatrix          = mat4.create();

    this.shadowState = new State();
    this.shadowState.depthTest = true;
    this.shadowState.culling = false;
    this.shadowState.blend = false;

    this.shadowMaterial = new ShadowMaterial();

    const mapSize = 1024;

    const baseTexture = new BaseTexture(null, {
        width: mapSize,
        height: mapSize,
        // this base texture writes HALF FLOATS for more precision whilst writing shadows!
        // half floats supported by most mobiles too!
        // type: TYPES.HALF_FLOAT,
        // mipmap: MIPMAP_MODES.OFF 
      });

    this.shadowMap = new Texture(baseTexture);

    this.shadowFramebuffer = new Framebuffer(mapSize, mapSize)
      .addColorTexture(0, baseTexture)
      .enableDepth();



    this.shadowMatrix = mat4.create();
    this.cameraLight = new CameraOrtho();
    this.cameraLight.ortho(-1 , 1 , 1 , -1 , 0.01, 4);
    this.cameraLight.lookAt([-0.83 / 2, 4, 0.0001], [-0.83 / 2 ,  0, 0]);

    // this.cameraLight.lookAt([0, 5, 0.001], [0, 0, 0]);


    mat4.identity(this.shadowMatrix);
    mat4.multiply(this.shadowMatrix, this.cameraLight.projection, this.cameraLight.viewMatrix);
    mat4.multiply(this.shadowMatrix, biasMatrix, this.shadowMatrix);



    // this.debugSprite = new Sprite(this.shadowMap.baseTexture.depthTexture);
    // this.debugSprite = new Sprite(this.shadowMap);
    this.debugSprite = new Sprite(Texture.WHITE);
    this.debugSprite.scale.set(1);
  }

  renderShadow (renderer, entities) {

    
    // const currentFramebuffer = renderer.framebuffer.current;

    // renderer.framebuffer.bind(this.shadowFramebuffer);
    // renderer.framebuffer.clear(1, 0, 0, 1);

    // renderer.gl.depthFunc(renderer.gl.LESS);
    
    // entities.forEach((e) =>
    // {
      
    //   const geometry = e.geometry;
    //   let material = this.shadowMaterial;
    //   let uniforms = material.uniforms;


    //   const matrix = e.matrix;
      
    //   uniforms.uModelMatrix =  matrix || this.identityMatrix;
    //   uniforms.shadowProjectionView = this.shadowMatrix;

    //   renderer.shader.bind(material);
    //   renderer.geometry.bind(geometry);

    //   const drawMode = e.drawMode !== undefined ? e.drawMode : DRAW_MODES.TRIANGLES;
    //   renderer.geometry.draw(drawMode, geometry.size, geometry.start, geometry.instanceCount);
    // });

    // renderer.framebuffer.bind(currentFramebuffer);
  }
}