// app/services/plateforme/components/DescriptionSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface DescriptionProps {
  sectionTitle: string
  sectionText: string
  image: string
}

export default function DescriptionSection({
  sectionTitle,
  sectionText,
  image,
}: DescriptionProps) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {sectionText}
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={image}
            alt="Illustration de la section description"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
