import type { CollectionConfig } from 'payload'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'adopterFirstName',
    defaultColumns: ['adopterFirstName', 'animalName', 'country', 'featured', 'createdAt'],
  },
  lockDocuments: false,
  fields: [
    {
      name: 'adopterFirstName',
      type: 'text',
      required: true,
      label: 'Adopter First Name',
    },
    {
      name: 'animalName',
      type: 'text',
      required: true,
      label: 'Animal Name',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      label: 'Adopter Country',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Adoption Quote',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Adopter Photo',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on Homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: false,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
