import { useState } from 'react'
import emailjs from 'emailjs-com'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Usar EmailJS para enviar el correo
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    }

    emailjs
      .send(
        'service_2ono0ec', // Reemplaza con tu service_id
        'template_vnkfs6y', // Reemplaza con tu template_id
        templateParams,
        'user_id' // Reemplaza con tu user_id
      )
      .then(
        (response) => {
          console.log('Correo enviado exitosamente:', response)
          alert('Thank you for your message. I\'ll get back to you soon!')
          setName('')
          setEmail('')
          setMessage('')
        },
        (error) => {
          console.error('Error al enviar el correo:', error)
          alert('Sorry, something went wrong. Please try again later.')
        }
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-foreground bg-background text-foreground"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-foreground bg-background text-foreground"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full p-2 border border-foreground bg-background text-foreground"
        ></textarea>
      </div>
      <button
        type="submit"
        className="brutalist-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
