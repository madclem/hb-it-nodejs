import { DRAW_MODES, DisplayObject, Rectangle, State } from 'pixi.js';
import { mat3, mat4 } from 'gl-matrix';

import { LineShadowMaterial } from './materials/LineShadowMaterial';
import { Shadow } from './Shadow'

class Container3D {
  constructor() {
    this.materialShadow = new LineShadowMaterial();
    this.shadowsEntities = []
    this.identityMatrix          = mat4.create();
		this._normalMatrix           = mat3.create();
		this._inverseModelViewMatrix = mat3.create();
		this._modelMatrix            = mat4.create();
		this._matrix                 = mat4.create();
    this.defaultState = new State();
    this.defaultState.depthTest = true;
    this.defaultState.blend = true;

    this.listeners = []

    this.camera = null;

    this.entities = []
    this.dummy = new DisplayObject();
    this.dummy.filterArea = new Rectangle(0, 0, 10000, 10000);
    this.dummy.render = this.render.bind(this); // hijack the render to render our 3d

    this.shadow = new Shadow();
  }

  init (stage) {
    stage.addChild(this.dummy); // so we can go into the render
  }

  addRenderListener (func) {
    this.listeners.push(func);
  }

  addChild (entity) {
    if (entity.material && entity.geometry) {
      this.entities.push(entity);
    }
  }

  setCameraShadow(cameraShadow) {
  }

  setCamera(camera) {
    this.camera = camera;
    this.setMatrices(this.identityMatrix);
  }

  setMatrices (modelMatrix) {
    mat4.copy(this._modelMatrix, modelMatrix);
		mat4.multiply(this._matrix, this.camera.matrix, this._modelMatrix);
		mat3.fromMat4(this._normalMatrix, this._matrix);
		mat3.invert(this._normalMatrix, this._normalMatrix);
		mat3.transpose(this._normalMatrix, this._normalMatrix);

		mat3.fromMat4(this._inverseModelViewMatrix, this._matrix);
		mat3.invert(this._inverseModelViewMatrix, this._inverseModelViewMatrix);
  }

  addToShadows(entity) {
    this.shadowsEntities.push(entity);
  }

  setRenderer(renderer) {
    this.renderer = renderer
  }

  renderShadows (renderer) {
    // this.shadow.renderShadow(renderer, this.shadowsEntities);
    const currentCamera = this.camera;
    this.setCamera(this.shadow.cameraLight)

    const currentFramebuffer = this.renderer.framebuffer.current;
    this.renderer.state.set(this.shadow.shadowState);
    
    this.renderer.framebuffer.bind(this.shadow.shadowFramebuffer);    
    this.renderer.framebuffer.clear(1, 0, 0, 1);

    this.renderer.gl.depthFunc(this.renderer.gl.LESS);
    
    this.renderEntities(this.shadowsEntities, this.renderer, true)
    
    this.renderer.framebuffer.bind(currentFramebuffer);
    this.setCamera(currentCamera)
  }

  render (renderer) {
    renderer.batch.flush();

    this.renderShadows(renderer)
    
    

    renderer.framebuffer.clear(1, 0, 0, 1);
    
    this.setMatrices(this.identityMatrix);
    const entities = this.entities;

    
    // if (output) {
    //   renderer.renderTexture.clear();
    // }
    
    this.renderEntities(this.entities, renderer);
    
    renderer.renderTexture.bind(null);
    // if (!arrEntities) {
    //   for (let i = 0; i < this.listeners.length; i++) {
    //     this.listeners[i](renderer);
    //   }
    // }
  }

  renderEntities (entities, renderer, isShadow) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      
      const geometry = entity.geometry;
      const material = isShadow ? this.materialShadow : entity.material;
      const state = entity.state || this.defaultState;
      const matrix = entity.matrix;
      
      const uniforms = material.uniforms;
    
    // update material matrices
      const camera = this.camera;
      if(camera) {
        material.uniforms.uProjectionMatrix = camera.projection;
        material.uniforms.uViewMatrix = camera.matrix;
      }

      if(isShadow) {
        material.uniforms.thickness =  .1;
		    material.uniforms.aspect =  window.innerWidth / window.innerHeight;
		    material.uniforms.resolutions =  [window.innerWidth, window.innerHeight];
      }
      
    
		  if (matrix) this.setMatrices(matrix);
      else this.setMatrices(this.identityMatrix);
      
      uniforms.uModelMatrix =  this._modelMatrix;
		  uniforms.uNormalMatrix = this._normalMatrix;
      uniforms.uModelViewMatrixInverse = this._inverseModelViewMatrix;

      const mapFrame = uniforms.uMapFrame;

      if (mapFrame) {
        const bt = uniforms.uMap.baseTexture;
        const tFrame = uniforms.uMap.frame;

        mapFrame.x = tFrame.x / bt.width;
        mapFrame.y = tFrame.y / bt.height;

        mapFrame.width = (tFrame.width / bt.width);
        mapFrame.height = (tFrame.height / bt.height);
      }
        
      renderer.shader.bind(material);

      renderer.state.set(state);

      renderer.geometry.bind(geometry);
      const drawMode = entity.drawMode !== undefined ? entity.drawMode : DRAW_MODES.TRIANGLES;
      
      renderer.geometry.draw(drawMode, geometry.size, geometry.start, geometry.instanceCount);

      if (!isShadow) {
        renderer.renderTexture.bind(null);
      }

    }
  }


}

export const container3D = new Container3D();