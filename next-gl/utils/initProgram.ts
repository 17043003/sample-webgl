export type programReturn = [WebGLProgram, number]

const initProgram = (gl: WebGL2RenderingContext, vShader: WebGLShader, fShader: WebGLShader): programReturn | [null, null] => {
    const program = gl.createProgram()
    if(!program) return [null, null];
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    gl.useProgram(program)

    return [program, gl.getAttribLocation(program, 'aVertexPosition')]
}

export default initProgram