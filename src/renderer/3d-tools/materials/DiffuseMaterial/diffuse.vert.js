export default
`
attribute vec3 position;
attribute vec2 uvs;
attribute vec3 normals;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec4 uMapFrame;

varying vec2 vUvs;

void main() {

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.);
    vUvs = (uvs * uMapFrame.zw ) + uMapFrame.xy;
}

`;
