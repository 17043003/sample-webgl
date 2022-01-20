const draw = (gl: WebGLRenderingContext, positionBuffer: WebGLBuffer, indexBuffer: WebGLBuffer, aVertexPosition: number, indexLength: number) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0, 0, 900, 700)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aVertexPosition)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.drawElements(gl.TRIANGLES, indexLength, gl.UNSIGNED_SHORT, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
}

export default draw