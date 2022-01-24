import { NextPage } from "next";
import { useState, useEffect } from 'react'
import drawCube from "../utils/Cube"

const Light: NextPage = () => {
    const [gl, setGl] = useState<WebGL2RenderingContext | null>(null)
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        setGl(canvas?.getContext('webgl2'))
        
        if(!gl) return
        drawCube(gl)

        const resizeCanvas = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        const keydownCallBack = (event: any) => {
        }
        
        document.addEventListener("keydown", keydownCallBack);
        document.addEventListener("resize", resizeCanvas)

        return () =>{
          document.removeEventListener("keydown", keydownCallBack)
          document.removeEventListener("resize", resizeCanvas)
        }
    })
    return(
        <div>
            <canvas id='canvas' width="900" height="700"></canvas>
        </div>
    )
}

export default Light