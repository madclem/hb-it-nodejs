
export default
`
uniform sampler2D uMap;
uniform float opacity;
uniform float percentage;
uniform float ratio;

varying vec2 vUvs;

vec3 colorA = vec3(32./255., 151./255., 60./255.);
vec3 colorB = vec3(151./255., 32./255., 32./255.);

void main()
{   
    vec2 uvs = vUvs;
    vec4 colorT = texture2D(uMap, vec2(uvs.x, uvs.y));
    vec3 colorP = mix(colorA, colorB, percentage); 
    vec3 color = colorP + colorT.rgb;


    gl_FragColor = vec4(color, opacity);
    // gl_FragColor = vec4(vec3(uvs.y), 1.);
}

`