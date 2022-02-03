import prepareShader from "../utils/prepareShader"
import initVAO from "../utils/initVAOBuffer"
import draw from "../utils/drawWithVAO"
import { calculateNormal } from "../utils/calculate"
import { mat4 } from "gl-matrix"

type Location = { [key: string]: number}
type ULocation = { [key: string]: WebGLUniformLocation | null }

interface WebGLProgramWithLoc {
    program: WebGLProgram | null
    location: Location
    uLocation: ULocation
}

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

    if(gl !== null){
        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clearDepth(100);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    // prepare shader
    const vertexShader = `#version 300 es
    precision mediump float;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uNormalMatrix;
    uniform vec3 uLightDirection;
    uniform vec4 uLightAmbient;
    uniform vec4 uLightDiffuse;
    uniform vec4 uMaterialDiffuse;

    // Supplied vertex position attribute
    in vec3 aVertexPosition;
    in vec3 aVertexNormal;

    out vec4 vVertexColor;

    void main(void) {
        vec3 N = vec3(uNormalMatrix * vec4(aVertexNormal, 1.0));
        vec3 L = normalize(uLightDirection);
        float lambertTerm = dot(N, -L);

        // Ambient
        vec4 Ia = uLightAmbient;
        // Diffuse
        vec4 Id = uMaterialDiffuse * uLightDiffuse * lambertTerm;

        // Set varying to be used inside of fragment shader
        vVertexColor = vec4(vec3(Ia + Id), 1.0);
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
    }
    `

    const fragmentShader = `#version 300 es
    precision mediump float;

    in vec4 vVertexColor;
    // Color that is the result of this shader
    out vec4 fragColor;

    void main(void) {
      fragColor = vVertexColor;
    }
    `

    const vShader = prepareShader(gl, "vertex", vertexShader)
    if(!vShader) return;

    const fShader = prepareShader(gl, "fragment", fragmentShader)
    if(!fShader) return;

    // create program
    const program = gl.createProgram()
    const location: Location = {};
    const uLocation: ULocation = {}
    if(!program) return [null, null];
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    gl.useProgram(program)

    location["aVertexPosition"] = gl.getAttribLocation(program, 'aVertexPosition')
    location["aVertexNormal"] = gl.getAttribLocation(program, "aVertexNormal")

    uLocation["uProjectionMatrix"] = gl.getUniformLocation(program, 'uProjectionMatrix');
    uLocation["uModelViewMatrix"] = gl.getUniformLocation(program, 'uModelViewMatrix');
    uLocation["uNormalMatrix"] = gl.getUniformLocation(program, 'uNormalMatrix');
    uLocation["uLightDirection"] = gl.getUniformLocation(program, 'uLightDirection');
    uLocation["uLightAmbient"] = gl.getUniformLocation(program, 'uLightAmbient');
    uLocation["uLightDiffuse"] = gl.getUniformLocation(program, 'uLightDiffuse');
    uLocation["uMaterialDiffuse"] = gl.getUniformLocation(program, 'uMaterialDiffuse');

    const programWithLoc: WebGLProgramWithLoc = { program, location, uLocation };

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const vBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    
    gl.enableVertexAttribArray(location["aVertexPosition"])
    gl.vertexAttribPointer(location["aVertexPosition"], 3, gl.FLOAT, false, 0, 0)

    // normals
    const normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(location["aVertexNormal"]);
    gl.vertexAttribPointer(location["aVertexNormal"], 3, gl.FLOAT, false, 0, 0);

    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

    // init light
    gl.uniform3fv(uLocation["uLightDirection"], [0, 0, -1]);
    gl.uniform4fv(uLocation["uLightAmbient"], [0.01, 0.01, 0.01, 1]);
    gl.uniform4fv(uLocation["uLightDiffuse"], [0.5, 0.5, 0.5, 1]);
    gl.uniform4f(uLocation["uMaterialDiffuse"], 0.1, 0.5, 0.8, 1);
    
    const modelViewMatrix = mat4.create();
    const projectionMatrix = mat4.create();
    const normalMatrix = mat4.create();

    const { width, height } = gl.canvas;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(projectionMatrix, 45, width / height, 0.1, 10000);
    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -40]);

    mat4.copy(normalMatrix, modelViewMatrix);
    mat4.invert(normalMatrix, normalMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    gl.uniformMatrix4fv(uLocation["uModelViewMatrix"], false, modelViewMatrix);
    gl.uniformMatrix4fv(uLocation["uProjectionMatrix"], false, projectionMatrix);
    gl.uniformMatrix4fv(uLocation["uNormalMatrix"], false, normalMatrix);

    // draw
    if(!indexBuffer || !vao) return;
    draw(gl, vao, indexBuffer, indices.length)
}

export default wall;