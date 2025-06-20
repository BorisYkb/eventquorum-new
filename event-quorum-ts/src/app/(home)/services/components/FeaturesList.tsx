// app/services/plateforme/components/Features.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Feature {
    title: string
    description: string
}

interface FeaturesProps {
    features: Feature[]
}

export default function Features({ features }: FeaturesProps) {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: 'power2.out',
                })
            }
        })
    }, [])

    return (
        <section className="py-20 px-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12">
                    Fonctionnalités clés
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => { cardsRef.current[index] = el }}
                            className="p-6 rounded-2xl shadow-md bg-gray-50 border border-gray-100 dark:bg-gray-700 dark:border-gray-800 hover:shadow-lg transition duration-300"
                        >
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white bg-indigo-600 rounded-full">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
