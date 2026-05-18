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
    slugField('name'),
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}
