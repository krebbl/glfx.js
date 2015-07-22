/**
 * @filter       Colorize
 * @description  Colorizes the image with the given rgb and amount
 *
 * @param r
 * @param g
 * @param b
 * @param amount
 */

function colorize(r, g, b, amount) {
    gl.colorize = gl.colorize || new Shader(null, '\
uniform sampler2D texture;\
uniform float amount;\
uniform float r;\
uniform float g;\
uniform float b;\
varying vec2 texCoord;\
void main() {\
  vec4 color = texture2D(texture, texCoord);\
  color.r -= (color.r - r) * (amount/100.0);\
  color.g -= (color.g - g) * (amount/100.0);\
  color.b -= (color.b - b) * (amount/100.0);\
  \
  gl_FragColor = color;\
}\
');

    simpleShader.call(this, gl.colorize, {
        r: clamp(0, r, 255),
        g: clamp(0, g, 255),
        b: clamp(0, b, 255),
        amount: clamp(0, amount, 1)
    });
};