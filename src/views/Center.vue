<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight, Megaphone, Flag, MessageSquare, Lightbulb, Bell } from 'lucide-vue-next';

const router = useRouter();
const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

const downloadApp = () => {
  console.log('Download App clicked');
  // Implement download logic here
};

// Set to false to use your custom images
const useDemoIcons = true;

const unreadCounts = ref({
  system: 38,
  activity: 5,
  interactive: 12
});
const showSettingsTab = ref(true);
</script>

<template>
  <div class="view-container">
    <div class="header">
      <div class="header-back">
        <ChevronLeft v-if="useDemoIcons" :size="24" />
        <img v-else :src="placeholderIcon" style="width: 24px; height: 24px;" />
      </div>
      <div class="header-title">Message Notification</div>
    </div>
    <div v-if="showSettingsTab" class="tabs">
      <div class="tab-item active">Message Center</div>
      <div class="tab-item" @click="router.push('/settings')">Message Settings</div>
    </div>
    <div class="content">
      <div class="category-list">
        <div class="category-item" @click="router.push({ path: '/system', query: { title: 'Marketing Messages' } })">
          <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00D1FF' : 'transparent' }">
            <Bell v-if="useDemoIcons" :size="20" />
            <img v-else :src="'/bell.png'" style="width: 40px; height: 40px;" />
          </div>
          <div class="category-info">
            <div class="category-name">Marketing Messages</div>
          </div>
          <div v-if="unreadCounts.system > 0" class="unread-badge">{{ unreadCounts.system }}</div>
          <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
          <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
        </div>
        <div class="category-item" @click="router.push('/activity')">
          <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00C9C8' : 'transparent' }">
            <Flag v-if="useDemoIcons" :size="20" />
            <img v-else :src="'/flag.png'" style="width: 40px; height: 40px;" />
          </div>
          <div class="category-info">
            <div class="category-name">Activity Notification</div>
          </div>
          <div v-if="unreadCounts.activity > 0" class="unread-badge">{{ unreadCounts.activity }}</div>
          <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
          <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
        </div>
        <div class="category-item" @click="router.push({ path: '/system', query: { title: 'Interactive Message' } })">
          <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00A9A5' : 'transparent' }">
            <MessageSquare v-if="useDemoIcons" :size="20" />
            <img v-else :src="'/message-square.png'" style="width: 40px; height: 40px;" />
          </div>
          <div class="category-info">
            <div class="category-name">Interactive Message</div>
          </div>
          <div v-if="unreadCounts.interactive > 0" class="unread-badge">{{ unreadCounts.interactive }}</div>
          <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
          <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
        </div>
      </div>
      <div class="bottom-tip">
        <Lightbulb v-if="useDemoIcons" :size="20" class="tip-icon" />
        <img v-else :src="'/lightbulb.png'" style="width: 20px; height: 20px;" class="tip-icon" />
        <div class="tip-text">
          Click <span class="tip-link" @click="downloadApp">"Download App"</span> for faster and more stable message push notifications.
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
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  display: flex;
  align-items: center;
  background: var(--bg-gray);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
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

.tabs {
  display: flex;
  justify-content: space-around;
  padding: 8px 16px;
  background: var(--bg-gray);
  position: sticky;
  top: calc(51px + env(safe-area-inset-top, 0px));
  z-index: 90;
  width: 100%;
}

.tab-item {
  padding: 8px 0;
  font-size: 16px;
  color: var(--text-medium);
  cursor: pointer;
  position: relative;
}

.tab-item.active {
  color: var(--text-dark);
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: var(--text-dark);
  border-radius: 2px;
}

.content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.category-list {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
}

.category-item {
  min-height: 64px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
}

.category-item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 16px;
  height: 1px;
  background: var(--border);
}

.category-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 16px;
  font-weight: 500;
}

.unread-badge {
  background: #FF5252;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 0 6px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.bottom-tip {
  margin-top: auto;
  margin-bottom: 20px;
  padding: 16px;
  background: #E6F7F7;
  border-radius: 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.tip-icon {
  color: var(--primary);
  margin-top: 2px;
}

.tip-text {
  font-size: 13px;
  color: var(--text-dark);
}

.tip-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}
</style>
