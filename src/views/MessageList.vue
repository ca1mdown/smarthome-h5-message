<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  MoreHorizontal, 
  Bell, 
  Settings, 
  Trash2, 
  CheckCircle, 
  Check 
} from 'lucide-vue-next';
import DeleteModal from '../components/DeleteModal.vue';
import requestWrapper from '../utils/request';
import { TEXT } from '../constants/text';

const router = useRouter();
const route = useRoute();

// State
const messages = ref([]);
const isLoading = ref(false);
const isFinished = ref(false);
const pageNum = ref(1);
const pageSize = 15;
const isEditing = ref(false);
const selectedMessages = ref([]);
const showDeleteModal = ref(false);
const showReadModal = ref(false);
const selectedId = ref(null); // For single delete in activity mode

// Route Params
const form = computed(() => route.query.form || 'CCS-PROC');
const pageTitle = computed(() => {
  if (form.value === 'CCS-PROC') return TEXT.messagecenter_activity_message;
  if (form.value === 'CCS-MKT') return TEXT.messagecenter_markMessages;
  if (form.value === 'CCS-SVY') return TEXT.research_msg;
  return TEXT.messagecenter_title;
});

// Layout Type
const isActivityLayout = computed(() => form.value === 'CCS-PROC');

const fetchMessages = async (isLoadMore = false) => {
  if (isLoading.value || (isLoadMore && isFinished.value)) return;

  isLoading.value = true;
  if (!isLoadMore) {
    pageNum.value = 1;
    messages.value = [];
    isFinished.value = false;
  }

  const params = {
    pageSize: pageSize,
    from: form.value,
    appKey: "12345678",
    filterType: "",
    pageNum: pageNum.value
  };

  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // For testing pagination, we always use mock data if the API fails or if we want to force it
    // In this environment, we'll force mock data to ensure the user can see pagination
    const startIdx = (pageNum.value - 1) * pageSize;
    const mockList = [];
    
    for (let i = 1; i <= pageSize; i++) {
      const currentIdx = startIdx + i;
      if (form.value === 'CCS-PROC') {
        mockList.push({
          id: `mock-proc-${currentIdx}`,
          pushTime: "2024-10-24 18:22:31",
          activityName: `Activity Name #${currentIdx}`,
          title: `Activity Title #${currentIdx}`,
          content: `We have received your submission, which is currently underreview. Once approved, you will receive a lucky draw ticket. #${currentIdx}`,
          jumpUrl: currentIdx % 2 === 0 ? '/detail' : '',
          detailType: 2
        });
      } else {
        mockList.push({
          id: `mock-${form.value}-${currentIdx}`,
          icon: 'https://picsum.photos/seed/msg/40/40',
          messageBody: {
            notification: {
              title: form.value === 'CCS-MKT' ? `Marketing Offer #${currentIdx}` : `Survey #${currentIdx}`,
              content: form.value === 'CCS-MKT' 
                ? `Exclusive marketing offer for you! Check out our latest deals and save big on your next purchase. #${currentIdx}`
                : `Please help us improve our service by completing this short survey. #${currentIdx}`
            }
          },
          readFlag: currentIdx % 3 === 0 ? 0 : 1,
          createTimeFormat: "2024-10-24 18:22:31",
          detailType: form.value === 'CCS-MKT' ? 0 : 1
        });
      }
    }

    messages.value = isLoadMore ? [...messages.value, ...mockList] : mockList;
    // Allow up to 5 pages for testing
    isFinished.value = pageNum.value >= 5;
    if (!isFinished.value) pageNum.value++;

  } catch (error) {
    console.error('Failed to fetch messages:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleScroll = (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  // Increase threshold and use a more robust check for mobile browsers
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    if (!isLoading.value && !isFinished.value) {
      fetchMessages(true);
    }
  }
};

onMounted(() => {
  fetchMessages();
});

watch(() => route.query.form, () => {
  fetchMessages();
});

// Actions
const toggleSelect = (id) => {
  if (selectedMessages.value.includes(id)) {
    selectedMessages.value = selectedMessages.value.filter(i => i !== id);
  } else {
    selectedMessages.value.push(id);
  }
};

const selectAll = () => {
  if (selectedMessages.value.length === messages.value.length) {
    selectedMessages.value = [];
  } else {
    selectedMessages.value = messages.value.map(m => m.id);
  }
};

const openDeleteModal = (id = null) => {
  selectedId.value = id;
  showDeleteModal.value = true;
};

const openReadModal = () => {
  if (selectedMessages.value.length === 0) return;
  showReadModal.value = true;
};

const confirmDelete = () => {
  if (selectedId.value) {
    messages.value = messages.value.filter(m => m.id !== selectedId.value);
  } else {
    messages.value = messages.value.filter(m => !selectedMessages.value.includes(m.id));
    selectedMessages.value = [];
    isEditing.value = false;
  }
  showDeleteModal.value = false;
  selectedId.value = null;
};

const confirmMarkAsRead = () => {
  messages.value = messages.value.map(m => {
    if (selectedMessages.value.includes(m.id)) {
      return { ...m, readFlag: 1 };
    }
    return m;
  });
  selectedMessages.value = [];
  isEditing.value = false;
  showReadModal.value = false;
};

const goToDetail = (msg) => {
  if (isEditing.value) {
    toggleSelect(msg.id);
    return;
  }
  router.push({
    path: '/detail',
    query: { 
      id: msg.id,
      type: msg.detailType || 0
    }
  });
};

const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';
const useDemoIcons = true;
</script>

<template>
  <div :class="['view-container', { 'system-layout': !isActivityLayout }]">
    <!-- Header -->
    <div class="header">
      <div class="header-back" @click="router.back()">
        <ChevronLeft v-if="useDemoIcons" :size="24" class="chevron-icon" />
        <img v-else :src="placeholderIcon" style="width: 24px; height: 24px;" class="chevron-icon" />
      </div>
      <div class="header-title">{{ pageTitle }}</div>
      <div class="header-right">
        <template v-if="!isActivityLayout">
          <Settings v-if="useDemoIcons" :size="22" @click="router.push({ path: '/notification', query: { tab: 'settings' } })" />
          <img v-else :src="placeholderIcon" style="width: 22px; height: 22px;" @click="router.push({ path: '/notification', query: { tab: 'settings' } })" />
        </template>
      </div>
    </div>

    <!-- List Header (Fixed, outside scroll area) -->
    <div v-if="!isActivityLayout" class="system-list-header">
      <div class="section-title">{{ pageTitle }}</div>
      <div class="header-actions">
        <div v-if="isEditing" class="select-all" @click="selectAll">
          {{ TEXT.select_all }} 
          <div :class="['checkbox', { checked: selectedMessages.length === messages.length && messages.length > 0 }]">
            <Check v-if="useDemoIcons" :size="14" color="white" />
            <img v-else :src="placeholderIcon" class="icon-small" />
          </div>
        </div>
        <div v-if="!isEditing" class="edit-btn" @click="isEditing = true">
          <Trash2 v-if="useDemoIcons" :size="22" />
          <img v-else :src="placeholderIcon" class="icon-medium" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="content" :style="{ paddingBottom: isEditing ? '120px' : '16px' }" @scroll="handleScroll">
      
      <!-- Message List -->
      <template v-if="messages.length > 0">
        
        <!-- Activity Layout -->
        <template v-if="isActivityLayout">
          <div v-for="item in messages" :key="item.id" class="activity-item-wrapper">
            <div class="date-header">{{ item.pushTime }}</div>
            <div class="activity-card">
              <div class="activity-card-header">
                <div class="activity-card-icon">
                  <Flag v-if="useDemoIcons" :size="14" color="white" />
                  <img v-else :src="placeholderIcon" class="icon-small" />
                </div>
                <div class="activity-card-title">{{ item.activityName }}</div>
                <div class="more-btn" @click="openDeleteModal(item.id)">
                  <MoreHorizontal v-if="useDemoIcons" :size="20" color="#999" />
                  <img v-else :src="placeholderIcon" class="icon-medium" />
                </div>
              </div>
              <div class="activity-card-body">
                <div class="activity-card-main-title">{{ item.title }}</div>
                <div class="activity-card-text">{{ item.content }}</div>
              </div>
              <div v-if="item.jumpUrl" class="activity-card-footer" @click="goToDetail(item)">
                <span>{{ TEXT.promotion_detail }}</span>
                <ChevronRight v-if="useDemoIcons" :size="16" color="#999" class="chevron-icon" />
                <img v-else :src="placeholderIcon" class="icon-small chevron-icon" />
              </div>
            </div>
          </div>
        </template>

        <!-- System Layout -->
        <template v-else>
          <div class="card">
            <div v-for="msg in messages" :key="msg.id" class="system-msg-item" @click="goToDetail(msg)">
              <div class="system-msg-icon">
                <img :src="msg.icon" class="icon-medium" />
              </div>
              <div class="system-msg-content">
                <div class="system-msg-header">
                  <div class="system-msg-title">{{ msg.messageBody.notification.title }}</div>
                </div>
                <div class="system-msg-desc">{{ msg.messageBody.notification.content }}</div>
                <div class="system-msg-time">{{ msg.createTimeFormat }}</div>
              </div>
              <div class="system-msg-right">
                <div v-if="msg.readFlag === 0 && isEditing" class="system-msg-dot edit-mode" />
                <div class="checkbox-slot">
                  <div v-if="isEditing" :class="['checkbox', { checked: selectedMessages.includes(msg.id) }]">
                    <Check v-if="useDemoIcons" :size="14" color="white" />
                    <img v-else :src="placeholderIcon" class="icon-small" />
                  </div>
                  <div v-else-if="msg.readFlag === 0" class="system-msg-dot" />
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Pagination Loading -->
        <div v-if="isLoading" class="loading-more">
          <div class="loading-spinner small"></div>
          <span>Loading...</span>
        </div>
        <div v-else-if="isFinished && messages.length > 0" class="no-more">{{ TEXT.list_no_more }}</div>
      </template>

      <!-- Initial Loading State -->
      <div v-else-if="isLoading" class="empty-state">
        <div class="loading-spinner"></div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="no-message-container">
          <div class="no-message-icon">
            <Bell v-if="useDemoIcons" :size="80" color="#F0F0F0" />
            <img v-else :src="placeholderIcon" style="width: 80px; height: 80px; opacity: 0.1" />
          </div>
      <div class="no-message-text">{{ TEXT.push_messages_none }}</div>
        </div>
      </div>
    </div>

    <!-- Edit Mode Footer -->
    <div v-if="isEditing" class="edit-footer">
      <div class="edit-actions">
        <div class="edit-action-btn" @click="openDeleteModal()">
          <Trash2 v-if="useDemoIcons" :size="20" />
          <img v-else :src="placeholderIcon" style="width: 20px; height: 20px;" />
          <span>{{ TEXT.list_delete }}</span>
        </div>
        <div class="edit-action-btn" @click="openReadModal">
          <CheckCircle v-if="useDemoIcons" :size="20" />
          <img v-else :src="placeholderIcon" style="width: 20px; height: 20px;" />
          <span>{{ TEXT.list_read }}</span>
        </div>
      </div>
      <div class="footer-divider"></div>
      <button class="cancel-btn" @click="isEditing = false">{{ TEXT.common_ui_cancel }}</button>
    </div>

    <!-- Delete Modal -->
    <DeleteModal 
      :show="showDeleteModal" 
      :title="TEXT.messagecenter_clearSceneMsg"
      :confirm-text="TEXT.list_delete"
      :is-delete="true"
      @close="showDeleteModal = false" 
      @confirm="confirmDelete" 
    />

    <!-- Read Modal -->
    <DeleteModal 
      :show="showReadModal" 
      :title="TEXT.msg_mark_all_as_read"
      :confirm-text="TEXT.list_read"
      :is-delete="false"
      @close="showReadModal = false" 
      @confirm="confirmMarkAsRead" 
    />
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100%;
  overflow: hidden;
  background: var(--bg-gray);
}

.header {
  position: sticky;
  top: 0;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-gray);
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.view-container.system-layout .content {
  display: block;
  margin: 0;
  background: transparent;
  border-radius: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 16px 16px 16px;
  flex: 1;
  min-height: 0;
}

.view-container.system-layout .system-list-header {
  padding: 12px 16px 16px 16px;
}

.view-container.system-layout .system-msg-item {
  padding: 12px 16px;
}

.view-container.system-layout .card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  min-height: 0;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

/* Activity Card Styles */
.activity-item-wrapper {
  margin-bottom: 24px;
}

.date-header {
  text-align: center;
  font-size: 13px;
  color: #999;
  margin-bottom: 12px;
}

.activity-card {
  background: #FFFFFF;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
}

.activity-card-header {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #F5F5F5;
}

.activity-card-icon {
  width: 28px;
  height: 28px;
  background: #00D1FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-card-title {
  flex: 1;
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.more-btn {
  cursor: pointer;
  color: #CCC;
}

.activity-card-body {
  padding: 16px;
  border-bottom: 1px solid #F5F5F5;
}

.activity-card-main-title {
  font-size: 17px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  line-height: 1.3;
}

.activity-card-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.activity-card-footer {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 15px;
  cursor: pointer;
}

.activity-card-footer span {
  color: #666;
}

/* System Message Styles */
.system-list-header {
  padding: 12px 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-gray);
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #999;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  cursor: pointer;
}

.icon-small {
  width: 14px;
  height: 14px;
}

.icon-medium {
  width: 22px;
  height: 22px;
}
.card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
}

.system-msg-item {
  min-height: 64px;
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  position: relative;
}

.system-msg-item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 68px;
  height: 1px;
  background: var(--border);
}

.system-msg-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.system-msg-content {
  flex: 1;
}

.system-msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.system-msg-title {
  font-size: 16px;
  font-weight: 500;
}

.system-msg-desc {
  font-size: 14px;
  color: var(--text-medium);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.system-msg-time {
  font-size: 12px;
  color: var(--text-light);
}

.system-msg-right {
  display: flex;
  align-items: center;
  margin-left: 8px;
  flex-shrink: 0;
}

.checkbox-slot {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.system-msg-dot {
  width: 8px;
  height: 8px;
  background: var(--danger);
  border-radius: 50%;
}

.system-msg-dot.edit-mode {
  margin-right: 12px;
}

.checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid #DDD;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.checkbox.checked {
  background: var(--primary);
  border-color: var(--primary);
}

/* Loading & Empty States */
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
  color: #999;
  font-size: 14px;
}

.no-more {
  text-align: center;
  padding: 16px 0;
  color: #CCC;
  font-size: 13px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}

.no-message-icon {
  margin-bottom: 12px;
}

.no-message-text {
  font-size: 14px;
}

/* Edit Footer */
.edit-footer {
  background: white;
  border-top: 1px solid #EEE;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding-bottom: max(16px, env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;
}

.edit-actions {
  display: flex;
  justify-content: space-around;
  padding: 12px 16px;
}

.edit-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.edit-action-btn span {
  font-size: 12px;
}

.footer-divider {
  height: 1px;
  background: #EEE;
  width: 100%;
}

.cancel-btn {
  width: 100%;
  padding: 16px;
  border: none;
  background: none;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}
</style>
