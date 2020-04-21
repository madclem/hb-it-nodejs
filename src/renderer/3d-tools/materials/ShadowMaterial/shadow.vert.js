
export default `

attribute vec3 aVertexPosition;

uniform mat4 uModelMatrix;
uniform mat4 shadowProjectionView;
varying float vDepth;


void main() {

    vec4 transformed =  vec4(aVertexPosition, 1.0);

    gl_Position = shadowProjectionView * uModelMatrix * transformed;
   
    vDepth = (gl_Position.z + 1.)/ 2.0;
}
`