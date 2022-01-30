import prepareShader from "../utils/prepareShader"
import initProgram, { programReturn } from "../utils/initProgram"
import initVAOBuffer from "../utils/initVAOBuffer"
import draw from "../utils/drawWithVAO"

const Cube = (gl: WebGL2RenderingContext) => {
    const vertices = [
        //front
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        // left
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0,-1.0, 1.0,
        //right
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        //back
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        // top
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        // bottom
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
    ]

    const indices = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23,
    ]

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
    if(!program || aVertexPosition == null) return;

    const [indexBuffer, vao] = initVAOBuffer(gl, vertices.map((it) => it * 0.3 ), indices, aVertexPosition)

    // draw
    if(!indexBuffer || !vao) return;
    draw(gl, vao, indexBuffer, indices.length)
}
export default Cube
