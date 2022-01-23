import initBuffer from "../utils/initBuffer"
import prepareShader from "./prepareShader"
import initProgram, { programReturn } from "../utils/initProgram"
import draw from "../utils/draw"
import initVAO from "../utils/initVAOBuffer"
import drawWithVAO from "../utils/drawWithVAO"

const drawPentagon = (gl: WebGL2RenderingContext) => {
    const vertices = [
        -0.3, -0.5, 0.0,
        0.3, -0.5, 0.0,
        0.6, 0.3, 0.0,
        0.0, 1.0, 0.0,
        -0.6, 0.3, 0.0
    ]

    const indices = [0, 1, 3, 0, 3, 4, 1, 2, 3]

    // const vBuffer = initBuffer(gl, "vertex", vertices)
    // const iBuffer = initBuffer(gl, "index", indices)

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

    const [program, aVertexPosition]: programReturn | [null, null] = initProgram(gl, vShader, fShader)
    if(!program || aVertexPosition) return;

    const [indexBuffer, vao] = initVAO(gl, vertices, indices, aVertexPosition)

    // draw
    // if(!vBuffer || !iBuffer) return;
    // draw(gl, vBuffer, iBuffer, aVertexPosition, indices.length)
    if(!indexBuffer || !vao) return;
    drawWithVAO(gl, vao, indexBuffer, indices.length)
}

export default drawPentagon