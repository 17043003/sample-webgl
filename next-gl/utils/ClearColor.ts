type clearColorType = {
    (
        gl: WebGL2RenderingContext, 
        color: [number, number, number, number],
    ): void
}

const updateClearColor: clearColorType = ((gl, color) => {
    gl.clearColor(...color)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, 0, 0)
})

export default updateClearColor;