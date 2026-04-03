<script setup>
import { useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight, Flag, MoreHorizontal } from 'lucide-vue-next';

const router = useRouter();
const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

const downloadApp = () => {
  console.log('Download App clicked');
  // Implement download logic here
};

// Set to false to use your custom images
const useDemoIcons = true;
</script>

<template>
  <div class="view-container">
    <div class="header">
      <div class="header-back" @click="router.push('/notification')">
        <ChevronLeft v-if="useDemoIcons" :size="24" />
        <img v-else :src="placeholderIcon" style="width: 24px; height: 24px;" />
      </div>
      <div class="header-title">Activity Notification</div>
    </div>
    <div class="content">
      <div class="activity-date">2024-10-24 18:22:31</div>
      <div v-for="i in 2" :key="i" class="activity-card">
        <div class="activity-card-header">
          <div class="activity-card-icon">
            <Flag v-if="useDemoIcons" :size="16" color="white" />
            <img v-else src="https://ais-dev-h4jglydwyiqxmmllrevn26-622377507127.europe-west2.run.app/input_file_1.png" style="width: 24px; height: 24px;" />
          </div>
          <div class="activity-card-title">Beyond Details & Win</div>
          <MoreHorizontal v-if="useDemoIcons" :size="20" color="#999" />
          <img v-else :src="placeholderIcon" style="width: 20px; height: 20px;" />
        </div>
        <div class="activity-card-body">
          <div class="activity-card-main-title">Beyond Details & Win | Thank you for your participation</div>
          <div class="activity-card-text">
            We have received your submission, which is currently underreview. Once approved, you will receive a lucky draw ticket.
          </div>
        </div>
        <div class="activity-card-footer" @click="router.push('/detail')">
          <span>View Details</span>
          <ChevronRight v-if="useDemoIcons" :size="16" />
          <img v-else src="https://ais-dev-h4jglydwyiqxmmllrevn26-622377507127.europe-west2.run.app/input_file_0.png" style="width: 16px; height: 16px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  background: var(--bg-gray);
  position: sticky;
  top: 0;
  z-index: 10;
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
}

.activity-date {
  text-align: center;
  color: var(--text-light);
  font-size: 12px;
  margin: 16px 0;
}

.activity-card {
  background: white;
  border-radius: 20px;
  margin-bottom: 16px;
  overflow: hidden;
}

.activity-card-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.activity-card-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 48px;
  height: 1px;
  background: var(--border);
}

.activity-card-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-card-title {
  flex: 1;
  font-weight: 500;
}

.activity-card-body {
  padding: 16px;
}

.activity-card-main-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.activity-card-text {
  color: var(--text-medium);
  font-size: 14px;
  line-height: 1.6;
}

.activity-card-footer {
  padding: 12px 16px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-medium);
  cursor: pointer;
}

.activity-card-footer::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 16px;
  height: 1px;
  background: var(--border);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  color: var(--text-light);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  opacity: 0.5;
}
</style>
