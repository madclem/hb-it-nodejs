
export default `
varying float vDepth;

void main()
{
    gl_FragColor = vec4(vDepth, 1., 1., 1.);
}
`