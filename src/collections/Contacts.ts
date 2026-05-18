import type { CollectionConfig } from 'payload'
import { sendMail } from '../lib/mailer'
import { contactAcknowledgementHtml, contactAcknowledgementText } from '../emails/contactAcknowledgement'
import { logger } from '../lib/logger'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        await sendMail({
          to: String(doc.email),
          subject: 'We got your message — Animal SOS Adoptions',
          html: contactAcknowledgementHtml(String(doc.name), String(doc.topic)),
          text: contactAcknowledgementText(String(doc.name)),
        }).catch((err: unknown) => logger.error('contact acknowledgement email failed', { error: String(err) }))
      },
    ],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'topic', 'createdAt'],
  },
  lockDocuments: false,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'topic',
      type: 'select',
      required: true,
      options: [
        { label: 'Adoption', value: 'adoption' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Donate', value: 'donate' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'animal',
      type: 'relationship',
      relationTo: 'animals',
      required: false,
      label: 'Related Animal (optional)',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
