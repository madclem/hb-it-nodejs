import { Program, Shader, UniformGroup, utils } from 'pixi.js';

import frag from './depth.frag.js';
import vert from './line.vert.js';

export class LineShadowMaterial extends Shader
{
    constructor(color = 0xFF0000)
    { 
      const uniforms = UniformGroup.from({ 
          thickness: 0.1,
          aspect: 1,
          resolutions: 1,
        });

        super(Program.from(vert, frag), uniforms);
    }

}
