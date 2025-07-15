const { app, BrowserWindow } = require('electron')
require('@electron/remote/main').initialize()

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 230,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    autoHideMenuBar: true
  })

  require('@electron/remote/main').enable(mainWindow.webContents)
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();
  global.print = print;
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// Server

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const escpos= require( 'escpos');
const escposUSB = require('escpos-usb');

dotenv.config();

const app2 = express()
app2.use(express.json())
app2.use(cors({
  origin: '*',
}));

const port = Number(process.env.PORT) || 3030;
app2.listen(port, () => console.log(`Server started in port ${port}`))

app2.post('/print', (req, res) => {
    const text = req.body?.text;

    print(text);

    return res.send('Print command received successfully');
})

function print(text = '') {
    const device = new escposUSB();
    const printer = new escpos.Printer(device, { encoding: "UTF-8" });

    device.open((error) => {
    if (error) {
        console.error('Error opening device:', error);
        return;
    }

    text.split('\n').map(line =>  printer.println(line))

    printer
        .println('')
        .println('')
        .println('')
        .cut()
        .close();
    });
}
