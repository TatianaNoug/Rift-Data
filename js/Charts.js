const path = require('path');
const { BrowserWindow } = require('electron');

class MainWindow {
  constructor() {
    let htmlPath = 'file://' + path.join(__dirname, '..') + '../pages/charts.html'

    this.window = new BrowserWindow({
      show: false,
      width: 400,
      height: 400,
      frame: false,
      minWidth: 800,
      minHeight: 600,
      backgroundColor: '#E4ECEF',
    })

    this.window.loadURL(htmlPath);
  }
}

module.exports = Charts;