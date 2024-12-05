import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.current) {
      emailjs
        .sendForm(
          "service_2ono0ec",
          "template_vnkfs6y",
          form.current,
          "AT5MawmVbJhva7a40"
        )
        .then(
          () => {
            console.log("Email sent successfully");
          },
          (error) => {
            console.error("Email send failed:", error);
          }
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" ref={form}>
      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-foreground bg-background text-foreground"
          name="user_name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-foreground bg-background text-foreground"
          name="user_email"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full p-2 border border-foreground bg-background text-foreground"
          name="message"
        ></textarea>
      </div>
      <button
        type="submit"
        className="-button-style"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
