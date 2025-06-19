const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  goToURL: (url) => ipcRenderer.send('go-to-url', url)
})
