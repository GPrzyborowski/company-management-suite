import crypto from 'crypto'
import bcrypt from 'bcrypt'

const BYTES = 5

async function generateLoginCode() {
    const code = crypto.randomBytes(BYTES).toString('hex')
    const hash = await bcrypt.hash(code, 10)
    return {code, hash}
}

export default generateLoginCode