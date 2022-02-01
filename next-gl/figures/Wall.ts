import prepareShader from "../utils/prepareShader"
import initVAO from "../utils/initVAOBuffer"
import draw from "../utils/drawWithVAO"
import { calculateNormal } from "../utils/calculate"

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

    const normals = calculateNormal(vertices, indices);

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
    const aColorLocation = gl.getAttribLocation(program, 'aVertexColor')

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const vBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    
    gl.enableVertexAttribArray(aVertexPosition)
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0)

    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    

    if(!indexBuffer || !vao) return;
    draw(gl, vao, indexBuffer, indices.length)
}

export default wall;