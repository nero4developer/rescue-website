const BASE = process.env.SEED_BASE_URL || 'https://rescue-website-seven.vercel.app'
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('Set SEED_EMAIL and SEED_PASSWORD env vars before running this script.')
  process.exit(1)
}

const ANIMALS = [
  { name: 'Coconut', type: 'cat',    breed: 'Domestic shorthair',  age: 36, sex: 'male',   status: 'available', slug: 'coconut', traits: ['Playful','Gentle','Indoor'] },
  { name: 'Tala',    type: 'puppy',  breed: 'Mixed breed',          age: 3,  sex: 'female', status: 'available', slug: 'tala',    traits: ['Energetic','Friendly','Loves kids'] },
  { name: 'Papaya',  type: 'kitten', breed: 'Mixed',                age: 2,  sex: 'female', status: 'available', slug: 'papaya',  traits: ['Curious','Affectionate'] },
  { name: 'Bruno',   type: 'dog',    breed: 'Sinhala Hound',        age: 24, sex: 'male',   status: 'available', slug: 'bruno',   traits: ['Loyal','Calm','House-trained'] },
  { name: 'Pepper',  type: 'cat',    breed: 'Domestic longhair',    age: 18, sex: 'female', status: 'available', slug: 'pepper',  traits: ['Independent','Quiet'] },
  { name: 'Sunny',   type: 'dog',    breed: 'Sinhala Hound mix',    age: 12, sex: 'male',   status: 'available', slug: 'sunny',   traits: ['Active','Playful','Good with dogs'] },
  { name: 'Kiri',    type: 'dog',    breed: 'Mixed breed',          age: 8,  sex: 'female', status: 'available', slug: 'kiri',    traits: ['Gentle','Smart'] },
  { name: 'Coco',    type: 'kitten', breed: 'Domestic shorthair',   age: 1,  sex: 'male',   status: 'available', slug: 'coco',    traits: ['Tiny','Playful','Loves cuddles'] },
  { name: 'Raja',    type: 'dog',    breed: 'Sinhala Hound',        age: 36, sex: 'male',   status: 'available', slug: 'raja',    traits: ['Protective','Calm','Loyal'] },
  { name: 'Luna',    type: 'cat',    breed: 'Mixed',                age: 6,  sex: 'female', status: 'available', slug: 'luna',    traits: ['Shy','Gentle','Indoor'] },
  { name: 'Mango',   type: 'puppy',  breed: 'Mixed breed',          age: 4,  sex: 'male',   status: 'available', slug: 'mango',   traits: ['Playful','Curious','Friendly'] },
  { name: 'Biscuit', type: 'dog',    breed: 'Sinhala Hound mix',    age: 20, sex: 'male',   status: 'available', slug: 'biscuit', traits: ['Friendly','Active','Good with kids'] },
]

async function main() {
  console.log('Logging in to production...')
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const loginData = await loginRes.json()
  const token = loginData.token
  if (!token) { console.error('Login failed:', loginData); process.exit(1) }
  console.log('Logged in as', loginData.user?.email, '\n')

  for (const animal of ANIMALS) {
    const { traits, ...fields } = animal
    const body = {
      ...fields,
      traits: traits.map(t => ({ trait: t })),
    }

    const res = await fetch(`${BASE}/api/animals`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.doc?.id) {
      console.log(`✓ Created ${animal.name} (ID: ${data.doc.id})`)
    } else {
      console.error(`✗ Failed ${animal.name}:`, data.errors ?? data)
    }
  }

  console.log('\nDone! Now run: node scripts/import-photos.mjs')
}

main().catch(console.error)
