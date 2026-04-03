<script setup>
// App.vue is kept clean, modals are handled within components
</script>

<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style>
:root {
  --primary: #00A9A5;
  --primary-light: rgba(0, 169, 165, 0.1);
  --bg-gray: #f5f6f7;
  --text-dark: #1A1A1A;
  --text-medium: #666666;
  --text-light: #999999;
  --card-bg: #FFFFFF;
  --border: #F0F0F0;
  --danger: #FF4D4F;
  --success: #52C41A;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-gray);
  color: var(--text-dark);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  min-height: 100vh;
  /* Support for safe areas */
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>

<style scoped>
.app-container {
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background-color: var(--bg-gray);
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
