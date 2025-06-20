const { app, BrowserWindow, ipcMain, BrowserView } = require("electron");
const path = require("path");

let mainWindow;
let view;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  view = new BrowserView({
    webPreferences: {
      partition: "persist:webview",
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.setBrowserView(view);

  const HEADER_HEIGHT = 130; // Espaço reservado para header + abas
  const resizeView = () => {
    const bounds = mainWindow.getBounds();
    view.setBounds({
      x: 0,
      y: HEADER_HEIGHT,
      width: bounds.width,
      height: bounds.height - HEADER_HEIGHT,
    });
  };

  resizeView();

  mainWindow.on("resize", resizeView);

  view.webContents.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
  );

  view.webContents.loadURL("https://google.com");

  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("go-to-url", (event, url) => {
  if (view && url.startsWith("http")) {
    view.webContents.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    );
    view.webContents.loadURL(url);
  }
});
