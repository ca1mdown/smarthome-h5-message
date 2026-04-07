<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ChevronLeft, Megaphone, Bell, WashingMachine } from 'lucide-vue-next';
import { TEXT } from '../constants/text';

const router = useRouter();
const route = useRoute();
const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

const messageId = computed(() => route.query.id);
const detailType = computed(() => parseInt(route.query.type) || 0);
const messageItem = ref(null);
const isLoading = ref(true);

const pageTitle = computed(() => {
  if (detailType.value === 2) return TEXT.detail_fault_title;
  return TEXT.helpcenter_problem_messageNotification;
});

// Set to false to use your custom images
const useDemoIcons = true;

const fetchMessageDetail = async () => {
  isLoading.value = true;
  try {
    // Simulate API call to fetch detail by messageId
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock detail data based on messageId and type
    // In a real app, this would come from the server
    const detail = {
      id: messageId.value,
      icon: 'https://picsum.photos/seed/detail/80/80',
      messageBody: {
        notification: {
          title: detailType.value === 2 ? 'Washing Machine Fault' : TEXT.detail_title,
          content: detailType.value === 2 
            ? 'Your washing machine has encountered an error. Please check the filter and water supply.'
            : TEXT.detail_placeholder_text
        }
      },
      createTimeFormat: '2025-04-26 14:22:16',
      readFlag: 0, // Assume unread initially for demo
      errorCode: 'E5'
    };
    
    messageItem.value = detail;

    // Mark as read if unread
    if (messageItem.value.readFlag === 0) {
      console.log(`Marking message ${messageId.value} as read...`);
      // Simulate API call to mark as read
      messageItem.value.readFlag = 1;
    }
  } catch (error) {
    console.error('Failed to fetch message detail:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (messageId.value) {
    fetchMessageDetail();
  }
});

const downloadApp = () => {
  // Logic to download app
  console.log('Downloading app...');
};
</script>

<template>
  <div class="view-container">
    <div class="header">
      <div class="header-back" @click="router.back()">
        <ChevronLeft v-if="useDemoIcons" :size="24" class="chevron-icon" />
        <img v-else :src="placeholderIcon" style="width: 24px; height: 24px;" class="chevron-icon" />
      </div>
      <div class="header-title">{{ pageTitle }}</div>
      <div class="header-right"></div>
    </div>
    
    <div class="content">
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
      </div>
      
      <template v-else-if="messageItem">
        <!-- Type 0: Standard Detail -->
        <div v-if="detailType === 0" class="detail-view standard">
          <div class="detail-icon-wrapper">
            <img :src="messageItem.icon" style="width: 80px; height: 80px; border-radius: 50%;" />
          </div>
          <div class="detail-title">{{ messageItem.messageBody.notification.title }}</div>
          <div class="detail-time">{{ messageItem.createTimeFormat }}</div>
          <div class="detail-body-text">{{ messageItem.messageBody.notification.content }}</div>
          <button class="btn-primary" @click="downloadApp">{{ TEXT.detail_btn }}</button>
        </div>

        <!-- Type 1: App Exclusive Content -->
        <div v-else-if="detailType === 1" class="detail-view exclusive">
          <div class="exclusive-icon-wrapper">
            <Bell :size="64" color="#333" />
          </div>
          <div class="exclusive-main-title">{{ TEXT.detail_exclusive_title }}</div>
          <div class="exclusive-desc">{{ TEXT.detail_exclusive_desc }}</div>
          
          <div class="exclusive-actions">
            <button class="btn-primary" @click="downloadApp">{{ TEXT.ems_download_app_button }}</button>
            <div class="btn-link" @click="router.push('/notification')">{{ TEXT.messagecenter_title }}</div>
          </div>
        </div>

        <!-- Type 2: Fault Reminder -->
        <div v-else-if="detailType === 2" class="detail-view fault">
          <div class="fault-icon-wrapper">
            <WashingMachine :size="64" color="#666" />
          </div>
          <div class="fault-desc">
            {{ messageItem.messageBody.notification.content }}
          </div>
          <div class="fault-error-code">{{ TEXT.detail_fault_error_code.replace('%@', messageItem.errorCode) }}</div>
          <div class="fault-time">{{ messageItem.createTimeFormat }}</div>
        </div>
      </template>
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
  background-color: #FFFFFF;
  width: 100%;
}

.header {
  position: sticky;
  top: 0;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFF;
  z-index: 100;
  width: 100%;
  flex-shrink: 0;
}

.header-back {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #000;
}

.header-right {
  width: 40px;
  height: 40px;
}

.content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.detail-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
}

.detail-icon-wrapper {
  margin-bottom: 24px;
}

.detail-body-text {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  text-align: left;
  width: 100%;
}

/* Standard Styles */
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

.detail-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #000;
}

.detail-time {
  font-size: 14px;
  color: #999;
  margin-bottom: 40px;
}

.btn-primary {
  width: 100%;
  background: var(--primary);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 30px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  max-width: 320px;
}

/* Exclusive Styles */
.exclusive-icon-wrapper {
  margin-top: 40px;
  margin-bottom: 40px;
}

.exclusive-main-title {
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin-bottom: 16px;
}

.exclusive-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40px;
  max-width: 280px;
}

.exclusive-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.btn-link {
  font-size: 17px;
  color: var(--primary);
  font-weight: 500;
  cursor: pointer;
}

/* Fault Styles */
.fault-icon-wrapper {
  margin-top: 20px;
  margin-bottom: 30px;
  width: 80px;
  height: 80px;
  background: #F8F8F8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fault-desc {
  font-size: 16px;
  color: #000;
  line-height: 1.6;
  margin-bottom: 24px;
  text-align: center;
}

.fault-error-code {
  font-size: 15px;
  color: #FF9500;
  margin-bottom: 12px;
}

.fault-time {
  font-size: 14px;
  color: #999;
}
</style>
