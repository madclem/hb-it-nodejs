import { Program, Shader, UniformGroup } from 'pixi.js';

import frag from './shadow.frag.js';
import { mat4 } from 'gl-matrix';
import vert from './shadow.vert.js';

export class ShadowMaterial extends Shader
{
    constructor()
    {
        const uniforms = UniformGroup.from({
            shadowProjectionView: mat4.create(),
        });


        super(Program.from(vert, frag), uniforms);
    }
}
