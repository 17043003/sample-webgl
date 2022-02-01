const calculateNormal = (vertices: number[], indices: number[]) => {
    const vNormals: number[] = Array(vertices.length).fill(0.0)
    for(let i = 0; i < indices.length; i += 3){        
        const v1 = [0, 1, 2].map((it) => {
            return vertices[3 * indices[i + 2] + it] - vertices[3 * indices[i + 1] + it];
        });

        const v2 = [0, 1, 2].map((it) => {
            return vertices[3 * indices[i] + it] - vertices[3 * indices[i + 1] + it];
        });

        const normal = [0, 1, 2].map((it) => {
            return v1[(it + 1) % 3] * v2[(it + 2) % 3] - v1[(it + 2) % 3] * v2[(it + 1) % 3];
        });

        for (let j = 0; j < 3; j++) {
            const index = 3 * indices[i + j];
            vNormals[index + 0] += normal[0];
            vNormals[index + 1] += normal[1];
            vNormals[index + 2] += normal[2];
        }
    }
    for (let i = 0; i < vertices.length; i += 3) {
        const nn = [0, 1, 2].map((it) => vNormals[i + it]);
  
        let len = Math.sqrt((nn[0] * nn[0]) + (nn[1] * nn[1]) + (nn[2] * nn[2]));
        if (len === 0) len = 1.0;
  
        const normalizedNormal = [0, 1, 2].map((it) => nn[it] / len)
  
        vNormals[i + 0] = normalizedNormal[0];
        vNormals[i + 1] = normalizedNormal[1];
        vNormals[i + 2] = normalizedNormal[2];
    }
    return vNormals;
}

export { calculateNormal };