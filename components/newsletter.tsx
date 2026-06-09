'use client'

import { useActionState } from 'react'
import { Mail, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  subscribeToNewsletter,
  type NewsletterState,
} from '@/app/actions/newsletter'

const initialState: NewsletterState = { status: 'idle', message: '' }

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState,
  )

  return (
    <div
      className={
        compact
          ? 'rounded-xl border border-border bg-card p-6'
          : 'rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12'
      }
    >
      <div className={compact ? '' : 'mx-auto max-w-xl text-center'}>
        <span
          className={
            compact
              ? 'flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground'
              : 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground'
          }
        >
          <Mail className="h-5 w-5" />
        </span>
        <h2
          className={
            compact
              ? 'mt-4 font-serif text-xl font-semibold text-foreground'
              : 'mt-5 font-serif text-2xl font-semibold sm:text-3xl text-balance'
          }
        >
          Bleib auf dem Laufenden
        </h2>
        <p
          className={
            compact
              ? 'mt-2 text-sm leading-relaxed text-muted-foreground'
              : 'mt-3 text-base leading-relaxed text-primary-foreground/80'
          }
        >
          Erhalte die besten Rezepte, News und Kaffeetipps direkt in dein
          Postfach. Kostenlos und jederzeit kündbar.
        </p>

        {state.status === 'success' ? (
          <div
            className={
              compact
                ? 'mt-4 flex items-center gap-2 rounded-lg bg-secondary p-3 text-sm text-foreground'
                : 'mt-6 flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/10 p-4 text-sm'
            }
          >
            <Check className="h-4 w-4 shrink-0 text-accent" />
            {state.message}
          </div>
        ) : (
          <form
            action={formAction}
            className={
              compact
                ? 'relative mt-4 flex flex-col gap-3'
                : 'relative mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row'
            }
          >
            {/* Honeypot: für Menschen unsichtbar, fängt Spam-Bots ab. */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="nl-company">Firma (bitte leer lassen)</label>
              <input
                id="nl-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <Input
              type="email"
              name="email"
              required
              placeholder="deine@email.de"
              aria-label="E-Mail-Adresse"
              className={
                compact
                  ? ''
                  : 'border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50'
              }
            />
            <Button
              type="submit"
              disabled={pending}
              className={
                compact
                  ? 'w-full'
                  : 'bg-accent text-accent-foreground hover:bg-accent/90'
              }
            >
              {pending ? 'Wird gesendet…' : 'Anmelden'}
            </Button>
          </form>
        )}

        {state.status === 'error' && (
          <p
            className={
              compact
                ? 'mt-3 flex items-center gap-2 text-sm text-destructive'
                : 'mt-4 flex items-center justify-center gap-2 text-sm text-primary-foreground'
            }
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {state.message}
          </p>
        )}
      </div>
    </div>
  )
}
