
export default
`
uniform float uTime;
uniform float uNbSeconds;
uniform float nbPlayers;
// uniform vec3 uLightPos;

varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 eye;
varying vec3 lightDir;

float diffuse(vec3 n, vec3 l) {
    float d = dot(normalize(n), normalize(l));
    return max(d, 0.0);
}

float diffuse(vec3 n, vec3 l, float t) {
    float d = dot(normalize(n), normalize(l));
    return mix(1.0, max(d, 0.0), t);
}

void main(void) {

    vec2 uvs = vTextureCoord * 2.0 - 1.0;
    float alpha = 1. - distance(vec2(0.5), abs(vec2(vTextureCoord)));


    
    
    vec3 n = normalize(vNormal);
    vec3 l = normalize(lightDir);
    vec3 e = normalize(eye);
    
    float d = 0.;
    float intensity = max(dot(n,l), 0.0);
    if (intensity > 0.0) {
        vec3 h = normalize(l + e);
        float intSpec = max(dot(h,n), 0.0);
        d = pow(intSpec, 4.);
    }

    float col = floor(fract(vTextureCoord.x * uNbSeconds - 0.08 / 2. + uTime) + 0.08);	// faded stripes
    float line = floor(fract(vTextureCoord.y * nbPlayers - 0.04 / 2.) + 0.04);	// faded stripes
    
    // vec4 colorCols = vec4(vec3(col) * vec3(0.5804, 0.5765, 0.5765), smoothstep(.15, 1.0, alpha * col) * 1.);
    
    
    float alphaC = smoothstep(.25, 1.0, alpha * line * col) * .4;
    
    
    
    vec4 colorCols = vec4(vec4(col * line * vec3(0.2), 1.) * alphaC);
    
    
    vec4 colorLight = vec4(d * 1.05);
    // vec4 colorLight = vec4(1.);
    vec4 color = colorCols * colorLight;

    gl_FragColor = colorCols;
    // gl_FragColor.a = smoothstep(.05, 1.0, alpha * col) * d;

    // gl_FragColor = vec4(d, 1.0);
    // gl_FragColor = vec4(vec3(0.5), smoothstep(.55, 1.0, alpha));
    // gl_FragColor.rgb *= alpha;
    // gl_FragColor = vec4(1., 0., 0., 1.);
    // gl_FragColor = vec4(smoothstep(.5, 1.0, alpha));
}
`