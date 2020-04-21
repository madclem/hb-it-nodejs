import { Program, Shader, UniformGroup } from 'pixi.js';

import frag from './grid.frag';
import vert from './grid.vert';

export default class GridMaterial extends Shader
{
    constructor()
    { 
      const uniforms = UniformGroup.from({ 
        uTime: 0,
        uNbSeconds: 10,
        uLightPosition: [0,0,0]
      });

      super(Program.from(vert, frag), uniforms);
    }

}