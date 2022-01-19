const prepareShader = (gl: WebGLRenderingContext, shaderScript: string) => {
    const shader = gl.createShader(gl.VERTEX_SHADER);
    if(!shader) return;
    gl.shaderSource(shader, shaderScript)
    gl.compileShader(shader)

    return shader
}

export default prepareShader