<script setup>
import { GLOBAL_CONFIG } from './constants/config';
const isRTL = GLOBAL_CONFIG.isRTL;
</script>

<template>
  <div :class="['app-container', { 'rtl-layout': isRTL }]" :dir="isRTL ? 'rtl' : 'ltr'">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style>
:root {
  --primary: #00A9A5;
  --primary-light: rgba(0, 169, 165, 0.1);
  --bg-gray: #F8F8F8;
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

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-gray);
  color: var(--text-dark);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

body {
  /* Individual views handle safe areas if needed */
}

/* RTL Global Support */
.rtl-layout {
  direction: rtl;
  text-align: right;
}

.rtl-layout .header-back {
  transform: scaleX(-1); /* Flip back button icon */
}

/* Flip chevron icons in RTL */
.rtl-layout .chevron-icon,
.rtl-layout .lucide-chevron-right,
.rtl-layout .lucide-chevron-left {
  transform: scaleX(-1);
}

/* Handle margins and paddings in RTL */
.rtl-layout [style*="margin-right"] {
  margin-left: attr(style, "margin-right") !important;
  margin-right: 0 !important;
}

/* Specific overrides for common classes */
.rtl-layout .unread-badge {
  margin-right: 0;
  margin-left: 4px;
}

.rtl-layout .system-msg-dot.edit-mode {
  margin-right: 0;
  margin-left: 12px;
}

.rtl-layout .activity-card-header {
  gap: 10px;
}

.rtl-layout .system-msg-right {
  margin-left: 0;
  margin-right: 8px;
}
</style>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  background-color: inherit;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
