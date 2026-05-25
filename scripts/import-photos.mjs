import { readFileSync } from 'fs'

const BASE = process.env.SEED_BASE_URL || 'https://rescue-website-seven.vercel.app'
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('Set SEED_EMAIL and SEED_PASSWORD env vars before running this script.')
  process.exit(1)
}

let dogSize = 400

async function pickImage(type) {
  if (type === 'cat' || type === 'kitten') {
    const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&mime_types=jpg,png', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    const [data] = await res.json()
    return data.url
  }
  const size = dogSize++
  return `https://place.dog/${size}/${size}`
}

async function main() {
  // 1. Login
  console.log('Logging in...')
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const loginData = await loginRes.json()
  const token = loginData.token
  if (!token) { console.error('Login failed:', loginData); process.exit(1) }
  console.log('Logged in as', loginData.user?.email)

  // 2. Get all animals
  const animalsRes = await fetch(`${BASE}/api/animals?depth=0&limit=50`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const { docs: animals } = await animalsRes.json()
  console.log(`Found ${animals.length} animals\n`)

  for (const animal of animals) {
    if (animal.photo) {
      console.log(`⟳  ${animal.name} already has a photo, skipping`)
      continue
    }

    const imageUrl = await pickImage(animal.type)
    console.log(`↓  Downloading photo for ${animal.name} (${animal.type})...`)

    // Download image
    const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!imgRes.ok) { console.error(`   Failed to download image: ${imgRes.status} ${imageUrl}`); continue }
    const imgBuffer = await imgRes.arrayBuffer()

    // Upload to Payload media
    const formData = new FormData()
    formData.append(
      'file',
      new Blob([imgBuffer], { type: 'image/jpeg' }),
      `${animal.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    )
    formData.append('_payload', JSON.stringify({ alt: `${animal.name} - ${animal.breed}` }))

    console.log(`↑  Uploading photo for ${animal.name}...`)
    const uploadRes = await fetch(`${BASE}/api/media`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: formData,
    })
    const uploadData = await uploadRes.json()
    const mediaId = uploadData.doc?.id
    if (!mediaId) { console.error(`   Upload failed:`, uploadData.errors ?? uploadData); continue }
    console.log(`   Media ID: ${mediaId}`)

    // Link photo to animal
    const patchRes = await fetch(`${BASE}/api/animals/${animal.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photo: mediaId }),
    })
    const patchData = await patchRes.json()
    if (patchData.doc?.id) {
      console.log(`✓  ${animal.name} — photo linked\n`)
    } else {
      console.error(`✗  Failed to link photo for ${animal.name}:`, patchData.errors ?? patchData)
    }
  }

  console.log('All done!')
}

main().catch(console.error)
