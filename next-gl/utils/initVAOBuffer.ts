const initVAO = (gl: WebGL2RenderingContext, vertices: number[], indices: number[], index: number) => {
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const vBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    
    gl.enableVertexAttribArray(index)
    gl.vertexAttribPointer(index, 3, gl.FLOAT, false, 0, 0)

    const iBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

    return [iBuffer, vao]
}

export default initVAO