import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Animals } from './collections/Animals'
import { Adoptions } from './collections/Adoptions'
import { Contacts } from './collections/Contacts'
import { Volunteers } from './collections/Volunteers'
import { SuccessStories } from './collections/SuccessStories'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  admin: {
    meta: {
      titleSuffix: '— Animal SOS Admin',
      description: 'Animal SOS adoption platform administration panel',
    },
  },
  collections: [Users, Media, Animals, Adoptions, Contacts, Volunteers, SuccessStories],
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  db: process.env.DATABASE_URI
    ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI, max: 2, ssl: { rejectUnauthorized: false } } })
    : sqliteAdapter({ client: { url: 'file:./animal-sos.db' } }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})