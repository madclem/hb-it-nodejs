
export default
`
uniform float alpha;
uniform sampler2D texture;

varying float vCounters;
varying vec2 vUV;
uniform vec3 uColor;

void main() {

  // vec4 color = vec4(uColor, 1.);
  vec4 color = vec4(vec3(0.), 1.);
  // vec4 color = mix(vec4(138./255., 218./255., 252./255., 1.), vec4(uColor, 1.), 1. - vCounters);

  gl_FragColor = color;
  // gl_FragColor *= (1.0 - vCounters);
//   gl_FragColor.a = 1.0;
}
`