'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function ParallaxScene() {
  const tuboRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let x = 0
    const animate = () => {
      x += 1
      if (tuboRef.current) {
        tuboRef.current.style.transform = `translateX(${-x}px)`
        if (x > window.innerWidth + 300) x = -200
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <>
      {/* Cidade ao fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fd1.png"
          alt="Cidade Sekai"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      {/* Produto na frente */}
      <div
        ref={tuboRef}
        className="absolute bottom-12 left-[100vw] z-20 transition-transform duration-100"
      >
        <Image
          src="/tubo.png"
          alt="Tubo Sekai"
          width={100}
          height={400}
          className="drop-shadow-xl"
        />
      </div>
    </>
  )
}
