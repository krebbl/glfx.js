function saturation(amount) {
    gl.saturation = gl.saturation || new Shader(null, '\
uniform sampler2D texture;\
uniform float amount;\
varying vec2 texCoord;\
void main() {\
  float luR = 0.3086;\
  float luG = 0.6094;\
  float luB = 0.0820;\
  float sv = amount/100.0 + 1.0;\
  \
  vec4 color = texture2D(texture, texCoord);\
  \
  float az = (1.0 - sv) * luR + sv;\
  float bz = (1.0 - sv) * luG;\
  float cz = (1.0 - sv) * luB;\
  float dz = (1.0 - sv) * luR;\
  float ez = (1.0 - sv) * luG + sv;\
  float fz = (1.0 - sv) * luB;\
  float gz = (1.0 - sv) * luR;\
  float hz = (1.0 - sv) * luG;\
  float iz = (1.0 - sv) * luB + sv;\
  \
  float r = max(0.0, (az * color.r + bz * color.g + cz * color.b));\
  float g = max(0.0, (dz * color.r + ez * color.g + fz * color.b));\
  float b = max(0.0, (gz * color.r + hz * color.g + iz * color.b));\
  \
  color.r = r;\
  color.g = g;\
  color.b = b;\
  \
  gl_FragColor = color;\
}\
');

    simpleShader.call(this, gl.saturation, {
        amount: clamp(-100, amount, 100)
    });

    return this;
};