import { NextPage } from "next";
import { useState, useEffect } from 'react'
import drawCube from "../figures/Cube"
import drawWall from "../figures/Wall"

const Light: NextPage = () => {
    const [gl, setGl] = useState<WebGL2RenderingContext | null>(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        setGl(canvas?.getContext('webgl2'))

        const resizeCanvas = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        const keydownCallBack = (event: any) => {
            if(!gl) return

            if(event.keyCode === 49) drawWall(gl)
            if(event.keyCode === 50) drawCube(gl)
            else return
        }
        
        document.addEventListener("keydown", keydownCallBack);
        document.addEventListener("resize", resizeCanvas)

        return () =>{
          document.removeEventListener("keydown", keydownCallBack)
          document.removeEventListener("resize", resizeCanvas)
        }
    })
    useEffect(() => {
        const loop = () => {
            setCount((prevCount) => (prevCount+1) % 360)
        }
        const intervalId = setInterval(loop, 500)
        
        return () => {
            clearInterval(intervalId)
        }
    }, [])
    return(
        <div>
            <canvas id='canvas' width="900" height="700"></canvas>
        </div>
    )
}

export default Light