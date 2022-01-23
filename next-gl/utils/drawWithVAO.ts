const draw = (gl: WebGL2RenderingContext, vao: WebGLVertexArrayObject, indexBuffer: WebGLBuffer, indexLength: number) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0, 0, 900, 700)

    gl.bindVertexArray(vao)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.drawElements(gl.TRIANGLES, indexLength, gl.UNSIGNED_SHORT, 0)

    gl.bindVertexArray(null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
}

export default draw