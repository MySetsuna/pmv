/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { config } = require('dotenv')
const { BeforeBuildContext } = require('electron-builder')
const path = require('path')
/**
 *
 * @param {BeforeBuildContext} _context
 */
const loadEnv = (_context) => {
  const mode = process.env.MODE
  const defaultPath = path.join(__dirname, './.env', `.env`)
  const modePath = path.join(__dirname, './.env', `.env.${mode}`)
  const localPath = path.join(__dirname, './.env', `.env.local`)
  const load = (envPath) => {
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

exports.default = loadEnv
