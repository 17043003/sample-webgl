import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

import clearColor from "../utils/ClearColor"
import checkKey from "../utils/CheckKey"
import drawSquare from "../figures/Square"
import drawPentagon from "../figures/Pentagon"

const Canvas: NextPage = () => {
    const [gl, setGl] = useState<WebGL2RenderingContext | null>(null)
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        setGl(canvas?.getContext('webgl2'))
        
        const resizeCanvas = () => {
          console.log("resized.")
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        const keydownCallBack = (event: any) => {
            if(!gl) return
            
            clearColor(gl, checkKey(event.keyCode))

            if(gl){
              if(event.keyCode === 51) drawSquare(gl)
              else if(event.keyCode === 52) drawPentagon(gl)
            }
        }
        
        document.addEventListener("keydown", keydownCallBack);
        document.addEventListener("resize", resizeCanvas)

        return () =>{
          document.removeEventListener("keydown", keydownCallBack)
          document.removeEventListener("resize", resizeCanvas)
        }
    })
  return (
    <div className={styles.container}>
      <canvas id='canvas' width="900" height="700"></canvas>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Canvas
