/**
 * @filter       Matrix
 * @description  Transforms each point by Matrix
 * @param matrix A 3x3 matrix for transformation
 */
function matrix(matrix) {
    gl.matrix = gl.matrix || new Shader('\
      attribute vec2 vertex;\
      attribute vec2 _texCoord;\
      varying vec2 texCoord;\
      \
    uniform mat3 u_matrix;\
    \
    void main()\
    {\
        texCoord = _texCoord;\
        gl_Position = vec4((u_matrix * vec3(vertex * 2.0 - 1.0, 1)).xy, 0, 1);\
    }', null);

    simpleShader.call(this, gl.matrix, {
        u_matrix: matrix

    });

    return this;
}