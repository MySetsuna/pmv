require('./config')
const assetsPath = process.env.ASSETS_PATH === undefined ? '' : process.env.ASSETS_PATH
console.log(assetsPath, 'import.meta.env.PM_APP_NAME', process.env)

module.exports = {
  appId: 'com.electron.app',
  productName: 'pmv',
  directories: {
    buildResources: 'build'
  },
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}'
  ],
  asarUnpack: ['resources/**'],
  afterSign: 'build/notarize.js',
  win: { executableName: 'pmv' },
  nsis: {
    artifactName: `${process.env.PM_APP_NAME}-${process.env.version}-setup.${process.env.ext}`,
    shortcutName: `${process.env.PM_APP_NAME}`,
    uninstallDisplayName: `${process.env.PM_APP_NAME}`,
    createDesktopShortcut: 'always'
  },
  mac: {
    entitlementsInherit: 'build/entitlements.mac.plist',
    extendInfo: {
      NSCameraUsageDescription: `Application requests access to the device's camera.`,
      NSMicrophoneUsageDescription: `Application requests access to the device's microphone.`,
      NSDocumentsFolderUsageDescription: `Application requests access to the user's Documents folder.`,
      NSDownloadsFolderUsageDescription: `Application requests access to the user's Downloads folder.`
    }
  },
  dmg: {
    artifactName: `${process.env.name}-${process.env.version}.${process.env.ext}`
  },
  linux: {
    target: ['AppImage', 'snap', 'deb'],
    maintainer: 'electronjs.org',
    category: 'Utility'
  },
  appImage: {
    artifactName: `${process.env.name}-${process.env.version}.${process.env.ext}`
  },
  npmRebuild: false,
  publish: { provider: 'generic', url: 'https://example.com/auto-updates' }
}
