import type { Field } from 'payload'

const format = (val: string): string =>
  val
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const slugField = (sourceField = 'name'): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (data?.[sourceField]) {
          return format(data[sourceField] as string)
        }
        return value
      },
    ],
  },
})
