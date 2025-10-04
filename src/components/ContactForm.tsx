import React, { useState } from 'react'
import FormInput from './FormInput'

const ContactForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to API
    // eslint-disable-next-line no-console
    console.log('contact', { name, email, message })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FormInput label="Name" id="contact-name" name="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />

      <FormInput label="Email" id="contact-email" name="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />

      <div className="mb-4">
        <label htmlFor="contact-message" className="block text-sm font-medium text-black mb-1">Message</label>
        <textarea id="contact-message" name="message" placeholder="Tell us how we can help..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black min-h-[140px]" />
      </div>

      <button type="submit" className="mt-2 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 focus:outline-none">Send Message</button>
    </form>
  )
}

export default ContactForm
