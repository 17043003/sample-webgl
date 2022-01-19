const prepareShader = (gl: WebGLRenderingContext, shaderType: string, shaderScript: string) => {
    let shader: WebGLShader | null;
    if(shaderType === "vertex"){
        shader = gl.createShader(gl.VERTEX_SHADER)
    }else if(shaderType === "fragment"){
        shader = gl.createShader(gl.FRAGMENT_SHADER)
    }else return

    if(!shader) return;
        gl.shaderSource(shader, shaderScript)
        gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.error(gl.getShaderInfoLog(shader))
        return null
    }

    return shader
}

export default prepareShader