'use client'

import { useState } from 'react'
import { Mail, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    value: 'hallo@kleine-kaffeewelt.de',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Röstgasse 7, 20095 Hamburg',
  },
  {
    icon: MessageSquare,
    title: 'Antwortzeit',
    value: 'In der Regel innerhalb von 48 Stunden',
  },
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  // Honeypot: legitime Nutzer lassen dieses Feld leer, Bots füllen es oft aus.
  const [trap, setTrap] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Verdächtige Einsendung (Honeypot befüllt) still verwerfen.
    if (trap.trim() !== '') {
      setSubmitted(true)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Schreib uns
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Hast du Fragen, Feedback oder eine Idee für einen Artikel? Wir freuen
          uns über jede Nachricht aus der Kaffee-Community.
        </p>
        <ul className="mt-8 space-y-5">
          {contactInfo.map((info) => (
            <li key={info.title} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-accent">
                <info.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {info.title}
                </p>
                <p className="text-sm text-muted-foreground">{info.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3">
        {submitted ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
              Vielen Dank!
            </h3>
            <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
              Deine Nachricht ist bei uns eingegangen. Wir melden uns so schnell
              wie möglich bei dir.
            </p>
            <Button
              variant="outline"
              className="mt-6 bg-transparent"
              onClick={() => setSubmitted(false)}
            >
              Weitere Nachricht senden
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Dein Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="du@beispiel.de"
                />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="subject">Betreff</Label>
              <Input
                id="subject"
                name="subject"
                required
                placeholder="Worum geht es?"
              />
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="message">Nachricht</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Deine Nachricht an uns ..."
              />
            </div>
            {/* Honeypot-Feld: für Menschen unsichtbar, fängt Spam-Bots ab. */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="website">
                Bitte dieses Feld leer lassen
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </label>
            </div>
            <Button type="submit" className="mt-6 w-full sm:w-auto">
              Nachricht senden
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
