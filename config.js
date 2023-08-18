const path = require('path')
const dotenv = require('dotenv')
const loadEnv = (env, mode) => {
  console.log(env, mode)
  const defaultPath = path.join(__dirname, './.env', `.env.default`)
  const envPath = path.join(__dirname, './.env', `.env.${env}`)
  const modePath = path.join(__dirname, './.env', `.env.${mode}.${env}`)
  const localPath = path.join(__dirname, './.env', `.env.local`)

  const load = (envPath) => {
    try {
      dotenv.config({ path: envPath, override: true })
    } catch (err) {
      console.log(err, 'err')
    }
  }
  console.log(modePath, 'modePath')
  load(defaultPath)
  load(envPath)
  load(modePath)
  load(localPath)
}

// Seems we can't use `instanceof Promise` here (would fail the tests)
loadEnv(process.env.NODE_ENV, process.env.MODE)
module.exports = { loadEnv }
