import prepareShader from "../utils/prepareShader"
import initVAO from "../utils/initVAOBuffer"
import draw from "../utils/drawWithVAO"

const wall = (gl: WebGL2RenderingContext) => {
    const vertices = [
        -20, -8, 20,
        -10, -8, 0,
        10, -8, 0,
        20, -8, 20,
        -20, 8, 20,
        -10, 8, 0,
        10, 8, 0,
        20, 8, 20
    ];

    const indices = [
        0, 5, 4,
        1, 5, 0,
        1, 6, 5,
        2, 6, 1,
        2, 7, 6,
        3, 7, 2
    ];

    // prepare shader
    const vertexShader = `#version 300 es
    precision mediump float;

    // Supplied vertex position attribute
    in vec3 aVertexPosition;

    void main(void) {
      // Simply set the position in clipspace coordinates
      gl_Position = vec4(aVertexPosition, 1.0);
    }
    `

    const fragmentShader = `#version 300 es
    precision mediump float;

    // Color that is the result of this shader
    out vec4 fragColor;

    void main(void) {
      // Set the result as red
      fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `

    const vShader = prepareShader(gl, "vertex", vertexShader)
    if(!vShader) return;

    const fShader = prepareShader(gl, "fragment", fragmentShader)
    if(!fShader) return;

    // create program
    const program = gl.createProgram()
    if(!program) return [null, null];
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    gl.useProgram(program)

    const aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition')

    // init buffer
    const [indexBuffer, vao] = initVAO(gl, vertices, indices, aVertexPosition)
    
    if(!indexBuffer || !vao) return;
    draw(gl, vao, indexBuffer, indices.length)
}

export default wall;