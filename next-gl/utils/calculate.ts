const calculateNormal = (vertices: number[], indices: number[]) => {
    const normals: number[] = []
    for(let i = 0; i < indices.length; i += 3){        
        const v1 = [0, 1, 2].map((it) => {
            return vertices[3 * indices[i + 2] + it] - vertices[3 * indices[i + 1] + it];
        });

        const v2 = [0, 1, 2].map((it) => {
            return vertices[3 * indices[i] + it] - vertices[3 * indices[i + 1] + it];
        });

        const normal = [0, 1, 2].map((it) => {
            return v1[(it + 1) % 3] * v2[(it + 2) % 3] - v1[(it + 2) % 3] * v2[(it + 1) % 3];
        })
    }
}

export default calculateNormal