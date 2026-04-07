<script setup>
import { useRouter } from 'vue-router';
import { ChevronLeft, Megaphone } from 'lucide-vue-next';

const router = useRouter();
const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

// Set to false to use your custom images
const useDemoIcons = true;
</script>

<template>
  <div class="view-container">
    <div class="header">
      <div class="header-back" @click="router.back()">
        <ChevronLeft v-if="useDemoIcons" :size="24" />
        <img v-else :src="placeholderIcon" style="width: 24px; height: 24px;" />
      </div>
      <div class="header-title">Beyond Details & Win</div>
    </div>
    <div class="content">
      <div class="detail-view">
        <div v-if="useDemoIcons" class="detail-icon-demo">
          <Megaphone :size="48" color="#00D1FF" />
        </div>
        <img v-else src="https://ais-dev-h4jglydwyiqxmmllrevn26-622377507127.europe-west2.run.app/input_file_2.png" style="width: 64px; height: 64px; margin-bottom: 24px" />
        <div class="detail-title">Here's the text. Here's the text.</div>
        <div class="detail-time">2025-04-26 14:22:16</div>
        <button class="btn-primary">View Details</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: -webkit-fill-available;
  overflow: hidden;
  background: var(--bg-gray);
}

.header {
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  display: flex;
  align-items: center;
  background: var(--bg-gray);
  z-index: 100;
  width: 100%;
  flex-shrink: 0;
}

.header-back {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-right: 24px;
}

.content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.detail-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
}

.detail-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  color: var(--text-dark);
}

.detail-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.detail-time {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 40px;
}

.btn-primary {
  width: 100%;
  background: var(--primary);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.detail-icon-demo {
  width: 80px;
  height: 80px;
  background: #F5F5F5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
</style>
