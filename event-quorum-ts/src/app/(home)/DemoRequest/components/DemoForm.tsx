'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import options from '../../data/options.json'

export default function DemoForm() {
  const formRef = useRef<HTMLDivElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    eventType: '',
    message: ''
  })

  type Errors = {
    name?: string
    email?: string
    company?: string
    eventType?: string
  }
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          onComplete: () => setIsLoaded(true)
        }
      )
    }
  }, [])

  const validate = () => {
    const errs: any = {}
    if (!form.name) errs.name = 'Nom requis'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide'
    if (!form.company) errs.company = 'Entreprise requise'
    if (!form.eventType) errs.eventType = 'Type requis'
    return errs
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setErrors({})
      console.log('Form submitted:', form)
      alert('Votre demande a été envoyée avec succès.')
      setForm({ name: '', email: '', company: '', eventType: '', message: '' })
    }
  }

  return (
    <div
      ref={formRef}
      className={`max-w-3xl mx-auto p-8 mt-12 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } bg-white dark:bg-gray-900`}
    >
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
        Parlons de votre projet événementiel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/** NOM */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/** EMAIL */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Adresse email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/** ENTREPRISE */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Entreprise / Organisation
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>

        {/** TYPE D’ÉVÉNEMENT */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Type d'événement
          </label>
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Choisir un type --</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
        </div>

        {/** MESSAGE */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Message (optionnel)
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-32"
          />
        </div>

        {/** BOUTON */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Envoyer la demande
        </button>
      </form>
    </div>
  )
}
