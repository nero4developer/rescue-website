import type { CollectionConfig } from 'payload'
import { sendMail } from '../lib/mailer'
import { volunteerConfirmationHtml, volunteerConfirmationText } from '../emails/volunteerConfirmation'
import { logger } from '../lib/logger'

export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        const roles: string[] = Array.isArray(doc.roles) ? doc.roles : []
        await sendMail({
          to: String(doc.email),
          subject: 'Welcome to the Animal SOS volunteer team 🐾',
          html: volunteerConfirmationHtml(String(doc.name), roles),
          text: volunteerConfirmationText(String(doc.name), roles),
        }).catch((err: unknown) => logger.error('volunteer confirmation email failed', { error: String(err) }))
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
    defaultColumns: ['name', 'email', 'country', 'createdAt'],
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
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      label: 'How would you like to help?',
      options: [
        { label: 'Foster', value: 'foster' },
        { label: 'Transport', value: 'transport' },
        { label: 'Fundraise', value: 'fundraise' },
        { label: 'Social Media', value: 'social-media' },
        { label: 'Events', value: 'events' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message (optional)',
    },
  ],
}
