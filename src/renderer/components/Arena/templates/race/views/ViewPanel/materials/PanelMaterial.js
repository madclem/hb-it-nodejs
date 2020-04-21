import { Program, Rectangle, Shader, UniformGroup } from 'pixi.js';

import frag from './panel.frag.js';
import vert from './panel.vert.js';

export class PanelMaterial extends Shader
{
    constructor(uMap)
    { 
      const uniforms = UniformGroup.from({ 
        uMap,
        opacity: 0.85,
        percentage: 0,
        ratio: 1,
        uMapFrame: new Rectangle(0, 0, 1, 1)
        // color: PIXI.utils.hex2rgb(color, new Float32Array(3)) 
      });

      super(Program.from(vert, frag), uniforms);
    }

}
