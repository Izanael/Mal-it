 //handle setupevents as quickly as possible
 const setupEvents = require('./installers/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
		// squirrel event handled and app will exit in 1000ms, so don't do anything else
		return;
 }

const { app, BrowserWindow } = require('electron')

let win

function createWindow () {

	win = new BrowserWindow({ 
	width: 620, 
	height: 720,
	minWidth: 620,
	minHeight: 720,
	webPreferences: {
		nodeIntegration: true
	},
	backgroundColor: '#060c21',
	frame: false,
	show: false
	})
	
	win.once('ready-to-show', () => {
		win.show();
	})

	win.loadFile('./html/index.html')
	//win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})