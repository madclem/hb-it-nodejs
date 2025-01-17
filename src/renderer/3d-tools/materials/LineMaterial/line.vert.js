export default
`
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aDirection;
attribute vec3 aPrevious;
attribute vec3 aNext;
attribute float aCounters;
// attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uTime;


uniform float thickness;
uniform float aspect;

varying vec2 vUV;
varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vNormal;
varying float vCounters;

void main() {

  // float thickness = .1;
  int miter = 0;

  vec2 aspectVec = vec2(aspect, 1.0);
  mat4 projViewModel = uProjectionMatrix * uViewMatrix * uModelMatrix;//projection * view * model;

  vec4 previousProjected = projViewModel * vec4(aPrevious.x, aPrevious.y, aPrevious.z, 1.0);
  vec4 currentProjected = projViewModel * vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z, 1.0);
  vec4 nextProjected = projViewModel * vec4(aNext.x, aNext.y, aNext.z, 1.0);

  vPosition = currentProjected.xyz;
  // vNormal = aNormal;
  vUV = aTextureCoord;
  //get 2D screen space with W divide and aspect correction
  vec2 currentScreen = currentProjected.xy / currentProjected.w * aspectVec;
  vec2 previousScreen = previousProjected.xy / previousProjected.w * aspectVec;
  vec2 nextScreen = nextProjected.xy / nextProjected.w * aspectVec;

  vCounters = aCounters;

  float scale = 1.0;
  // float len = thickness;
  float len = pow(1. - vCounters, .4) * thickness;
  // float len = thickness * uThicknessOffset;

  float orientation = aDirection;

  vColor = vec3(1.0, .0, 0.0);
  vec2 dir = vec2(0.0);
  if (currentScreen == previousScreen) {
    dir = normalize(nextScreen - currentScreen);
  }
  else if (currentScreen == nextScreen) {
    dir = normalize(currentScreen - previousScreen);
  }
  else {
    //get aDirections from (C - B) and (B - A)

    vec2 dirA = normalize((currentScreen - previousScreen));
    if (miter == 1) {
      vec2 dirB = normalize((nextScreen - currentScreen));
      //now compute the miter join normal and length
      vec2 tangent = normalize(dirA + dirB);
      vec2 perp = vec2(-dirA.y, dirA.x);
      vec2 miter = vec2(-tangent.y, tangent.x);
      dir = tangent;
      len = thickness / dot(miter, perp);
    } else {
      dir = dirA;

    }
  }
  vec2 normal = vec2(-dir.y, dir.x);
  vColor = vec3(normal, 1.0);
  normal.x /= aspect;
  normal *= len/2.0;

  vec4 offset =  vec4(normal * orientation, 0.0, 0.0);

  gl_Position = currentProjected + offset;
}
`;
