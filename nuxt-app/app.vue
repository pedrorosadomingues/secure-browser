<template>
  <div class="browser dark">
    <div class="browser-header">
      <div class="nav-buttons">
        <button class="nav-btn">&#8592;</button>
        <button class="nav-btn">&#8594;</button>
      </div>
       <input
        v-model="url"
        @keyup.enter="navigate"
        class="url-bar"
        placeholder="Digite a URL"
      />
      <button @click="navigate" class="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
        Ir
      </button>
      <button class="settings-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
    </div>

    <div class="tabs">
      <div class="tab active">
        Google
        <span class="close">&#10005;</span>
      </div>
      <div class="tab">
        Facebook
        <span class="close">&#10005;</span>
      </div>
      <div class="tab">
        Meta Ads
      </div>
    </div>

    <div class="browser-body">
      <p class="placeholder">Conteúdo do site aqui...</p>
    </div>
  </div>
</template>

<style scoped>
.browser {
  background-color: #0f0f14;
  color: #d0d0dc;
  font-family: 'Segoe UI', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.browser-header {
  display: flex;
  align-items: center;
  background: #1f1f28;
  padding: 8px 16px;
  gap: 10px;
}

.nav-buttons .nav-btn {
  background: #2d2d3a;
  color: white;
  border: none;
  border-radius: 5px;
  width: 28px;
  height: 28px;
  font-size: 16px;
  cursor: pointer;
}

.url-bar {
  flex: 1;
  padding: 8px;
  background: #2c2c38;
  border: none;
  border-radius: 15px;
  color: #fff;
  font-size: 14px;
}

.settings-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.3s;
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tabs {
  display: flex;
  background: #1b1b23;
  padding-left: 12px;
  gap: 6px;
  padding-top: 8px;
}

.tab {
  background: #2a2a38;
  padding: 6px 12px;
  border-radius: 6px 6px 0 0;
  color: #bbb;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.tab.active {
  background: #353543;
  color: white;
}

.close {
  font-size: 12px;
  cursor: pointer;
}

.browser-body {
  flex: 1;
  background: #0f0f14;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder {
  color: #666;
  font-size: 16px;
  font-style: italic;
}
</style>


<script setup>
import { ref } from 'vue'

const url = ref('https://google.com')

function navigate() {
  if (!url.value.startsWith('http')) {
    url.value = 'https://' + url.value
  }
  if (window.electronAPI?.goToURL) {
    window.electronAPI.goToURL(url.value)
  }
}

function goBack() {
  window.electronAPI?.goBack?.()
}

function goForward() {
  window.electronAPI?.goForward?.()
}
</script>
