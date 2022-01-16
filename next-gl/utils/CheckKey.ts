const green: [number, number, number, number] = [0.2, 0.8, 0.2, 1.0]
const blue: [number, number, number, number] = [0.2, 0.2, 0.8, 1.0]

const checkKey = ((keyCode: number) => {
    let color: [number, number, number, number] = [1.0, 1.0, 1.0, 1.0]
    switch(keyCode){
        case 49:
            color = green
            break
        case 50:
            color = blue
            break
    }
    return color
})

export default checkKey