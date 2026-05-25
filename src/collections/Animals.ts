import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from '../fields/slug'

export const Animals: CollectionConfig = {
  slug: 'animals',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'breed', 'status', 'updatedAt'],
  },
  lockDocuments: false,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Puppy', value: 'puppy' },
        { label: 'Kitten', value: 'kitten' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'breed',
      type: 'text',
      required: true,
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Age in months',
      },
    },
    {
      name: 'sex',
      type: 'select',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Adopted', value: 'adopted' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'traits',
      type: 'array',
      fields: [
        {
          name: 'trait',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'temperament',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Calm & gentle', value: 'calm-gentle' },
        { label: 'Playful & energetic', value: 'playful-energetic' },
        { label: 'Shy, needs patience', value: 'shy-patience' },
        { label: 'Social butterfly', value: 'social-butterfly' },
        { label: 'Independent', value: 'independent' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'goodWith',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Children', value: 'children' },
        { label: 'Other dogs', value: 'other-dogs' },
        { label: 'Cats', value: 'cats' },
        { label: 'First-time owners', value: 'first-time-owners' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'special',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Urgent cases', value: 'urgent' },
        { label: 'Lovely little quirks', value: 'quirky' },
        { label: 'Senior animals', value: 'senior' },
      ],
      admin: { position: 'sidebar' },
    },
    slugField('name'),
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}
