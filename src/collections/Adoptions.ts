import type { CollectionConfig } from 'payload'
import { sendMail } from '../lib/mailer'
import { adoptionConfirmationHtml, adoptionConfirmationText } from '../emails/adoptionConfirmation'
import { adoptionNotificationHtml } from '../emails/adoptionNotification'
import { logger } from '../lib/logger'

export const Adoptions: CollectionConfig = {
  slug: 'adoptions',
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        const applicantName: string = doc.applicantName ?? ''
        const applicantEmail: string = doc.applicantEmail ?? ''
        const applicantPhone: string = doc.applicantPhone ?? ''
        const address: string = doc.address ?? ''
        const homeType: string = doc.homeType ?? ''
        const lifestyleAnswers: string = doc.lifestyleAnswers ?? ''
        const hasGarden: boolean = Boolean(doc.hasGarden)
        const hasChildren: boolean = Boolean(doc.hasChildren)
        const hasOtherPets: boolean = Boolean(doc.hasOtherPets)

        // Resolve animal name from relation
        let animalName = 'the animal'
        try {
          const animalId = typeof doc.animal === 'object' ? doc.animal?.id : doc.animal
          if (animalId) {
            const animal = await req.payload.findByID({ collection: 'animals', id: animalId, depth: 0 })
            animalName = (animal as { name: string }).name ?? animalName
          }
        } catch { /* non-fatal */ }

        // Confirmation to applicant
        await sendMail({
          to: applicantEmail,
          subject: `Your adoption application for ${animalName} — Animal SOS`,
          html: adoptionConfirmationHtml(applicantName, animalName),
          text: adoptionConfirmationText(applicantName, animalName),
        }).catch((err: unknown) => logger.error('adoption confirmation email failed', { error: String(err) }))

        // Notification to admin
        const adminEmail = process.env.ADMIN_EMAIL
        if (adminEmail) {
          await sendMail({
            to: adminEmail,
            subject: `New adoption application — ${animalName} — ${applicantName}`,
            html: adoptionNotificationHtml({
              applicantName,
              applicantEmail,
              applicantPhone,
              address,
              animalName,
              homeType,
              hasGarden,
              hasChildren,
              hasOtherPets,
              lifestyleAnswers,
              applicationId: String(doc.id),
            }),
          }).catch((err: unknown) => logger.error('adoption notification email failed', { error: String(err) }))
        }
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
    useAsTitle: 'applicantEmail',
    defaultColumns: ['applicantName', 'applicantEmail', 'animal', 'status', 'createdAt'],
  },
  lockDocuments: false,
  fields: [
    {
      name: 'animal',
      type: 'relationship',
      relationTo: 'animals',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'applicantName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'applicantEmail',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'applicantPhone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Home Address',
    },
    {
      name: 'homeType',
      type: 'select',
      required: true,
      label: 'Home Type',
      options: [
        { label: 'House', value: 'house' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Condo', value: 'condo' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'hasGarden',
      type: 'checkbox',
      label: 'Has Garden or Outdoor Space',
      defaultValue: false,
    },
    {
      name: 'hasChildren',
      type: 'checkbox',
      label: 'Has Children',
      defaultValue: false,
    },
    {
      name: 'hasOtherPets',
      type: 'checkbox',
      label: 'Has Other Pets',
      defaultValue: false,
    },
    {
      name: 'lifestyleAnswers',
      type: 'textarea',
      label: 'Lifestyle & Experience',
      admin: {
        description: 'Describe your daily routine, experience with animals, and why you want to adopt.',
      },
    },
  ],
}
