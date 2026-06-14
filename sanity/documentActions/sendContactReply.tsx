import {useState} from 'react'
import type {DocumentActionComponent} from 'sanity'

type ContactDocument = {
  replyBody?: string
  replyStatus?: string
}

export const sendContactReply: DocumentActionComponent = (props) => {
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<string>()
  const document = props.published as ContactDocument | null
  const documentId = props.id.replace(/^drafts\./, '')
  const replyBody = document?.replyBody?.trim()

  if (props.type !== 'contactSubmission') return null

  return {
    label: sending ? 'Antwort wird gesendet …' : 'Antwort senden',
    disabled: sending || !replyBody || document?.replyStatus === 'sent',
    tone: document?.replyStatus === 'sent' ? 'positive' : 'primary',
    title: !document
      ? 'Antwortentwurf zuerst veröffentlichen.'
      : !replyBody
        ? 'Bitte zuerst einen Antworttext eintragen.'
        : document.replyStatus === 'sent'
          ? 'Diese Antwort wurde bereits versendet.'
          : undefined,
    onHandle: async () => {
      const token = window.prompt('Versand-Kennwort eingeben')
      if (!token) return

      setSending(true)
      setMessage(undefined)

      try {
        const response = await fetch(
          'https://meine-kleine-kaffeewelt.de/api/contact/reply',
          {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({documentId, token}),
          },
        )
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || 'Versand fehlgeschlagen.')
        }

        setMessage('Antwort wurde versendet.')
        props.onComplete()
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'Versand fehlgeschlagen.',
        )
      } finally {
        setSending(false)
      }
    },
    dialog: message
      ? {
          type: 'popover',
          onClose: () => setMessage(undefined),
          content: message,
        }
      : undefined,
  }
}
