import { Program, Rectangle, Shader, UniformGroup } from 'pixi.js';

import frag from './diffuse.frag.js';
import vert from './diffuse.vert.js';

export class DiffuseMaterial extends Shader
{
    constructor(uMap)
    { 
      const uniforms = UniformGroup.from({ 
        uMap,
        opacity: 1, 
        uMapFrame: new Rectangle(0, 0, 1, 1)
        // color: PIXI.utils.hex2rgb(color, new Float32Array(3)) 
      });

      super(Program.from(vert, frag), uniforms);
    }

}
