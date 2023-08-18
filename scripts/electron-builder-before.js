/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { config } = require('dotenv')
const path = require('path')
/**
 *
 * @param {BeforePackContext} context
 */
const beforePack = (context) => {
  // todo
}

const loadEnv = (mode) => {
  const defaultPath = path.join('./.env', `.env`)
  const modePath = path.join('./.env', `.env.${mode}`)
  const localPath = path.join('./.env', `.env.local`)
  const load = (envPath) => {
    console.log(envPath, 'envPath')
    try {
      config({ path: envPath, override: true })
    } catch (err) {
      console.log(err)
    }
  }
  load(defaultPath)
  load(modePath)
  load(localPath)
}
module.exports = { beforePack, loadEnv }
