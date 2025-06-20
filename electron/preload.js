const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  goBack: () => ipcRenderer.send("go-back"),
  goForward: () => ipcRenderer.send("go-forward"),
  goToURL: (url) => ipcRenderer.send("go-to-url", url),
  onURLChange: (callback) => ipcRenderer.on("update-url", (event, url) => callback(url)),
});
