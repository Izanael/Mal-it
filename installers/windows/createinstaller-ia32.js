const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
	console.error(error.message || error)
	process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
	appDirectory: path.join(outPath, 'mal-it-win32-ia32/'),
	authors: 'Izanael',
	noMsi: true,
	outputDirectory: path.join(outPath, 'mal-it-installer-32bit'),
	exe: 'Mal it!.exe',
	setupExe: 'Mal it!.exe',
	description: "Mal it!"
  })
}