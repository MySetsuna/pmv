const { loadEnv } = require('./scripts/electron-builder-before.js')

loadEnv(process.env.MODE)

const assetsPath = process.env.ASSETS_PATH === undefined ? '' : process.env.ASSETS_PATH
console.log(assetsPath, 'import.meta.env.PM_APP_NAME', process.env.PM_APP_NAME, 'PM_APP_NAME')

module.exports = {
  appId: 'com.electron.app',
  // beforePack: beforePack,
  productName: `${process.env.PM_APP_NAME}`,
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
    artifactName: `${process.env.PM_APP_NAME}-setup.exe`,
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
    sign: false,
    contents: [
      {
        x: 130,
        y: 220
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications'
      }
    ]
  },
  linux: {
    target: ['AppImage', 'snap', 'deb'],
    maintainer: 'electronjs.org',
    category: 'Utility'
  },
  npmRebuild: false,
  publish: { provider: 'generic', url: 'https://example.com/auto-updates' }
}
