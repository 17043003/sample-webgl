import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

import clearColor from "../utils/ClearColor"
import checkKey from "../utils/CheckKey"

const Home: NextPage = () => {
    const [gl, setGl] = useState<WebGLRenderingContext | null>(null)
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        setGl(canvas?.getContext('webgl2'))

        document.addEventListener("keydown", (event) => {
            if(!gl) return
            
            clearColor(gl, checkKey(event.keyCode))
        })
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

export default Home
