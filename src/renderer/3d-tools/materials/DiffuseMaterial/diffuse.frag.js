
export default
`
uniform sampler2D uMap;
uniform float opacity;

varying vec2 vUvs;

void main()
{
    gl_FragColor = texture2D(uMap, vec2(vUvs.x, 1. - vUvs.y)) * 1.0;
}

`