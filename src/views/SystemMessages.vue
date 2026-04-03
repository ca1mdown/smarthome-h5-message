<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeft, Settings, Trash2, CheckCircle, Bell, Check } from 'lucide-vue-next';
import DeleteModal from '../components/DeleteModal.vue';

const router = useRouter();
const isEditing = ref(false);
const selectedMessages = ref([0]);
const showDeleteModal = ref(false);
const messages = ref([
  { id: 0, title: "Account login elsewhere", desc: "Your account was logged in...", time: "10:32", unread: true },
  { id: 1, title: "Account login elsewhere", desc: "Your account was logged in...", time: "2024-06-14", unread: false },
]);

const toggleSelect = (id) => {
  if (selectedMessages.value.includes(id)) {
    selectedMessages.value = selectedMessages.value.filter(i => i !== id);
  } else {
    selectedMessages.value.push(id);
  }
};

const selectAll = () => {
  selectedMessages.value = messages.value.map(m => m.id);
};

const showDelete = () => {
  showDeleteModal.value = true;
};

const deleteSelected = () => {
  messages.value = messages.value.filter(m => !selectedMessages.value.includes(m.id));
  selectedMessages.value = [];
  showDeleteModal.value = false;
  isEditing.value = false;
};

const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

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
      <div class="header-title">Message center</div>
      <div class="header-right">
        <Settings v-if="useDemoIcons" :size="22" @click="router.push('/notification')" />
        <img v-else :src="placeholderIcon" style="width: 22px; height: 22px;" @click="router.push('/notification')" />
      </div>
    </div>
    <div class="content" :style="{ padding: 0, paddingBottom: isEditing ? '120px' : '0' }">
      <div style="padding: 16px; display: flex; justify-content: space-between; align-items: center">
        <div style="font-size: 18px; font-weight: 600">System Messages</div>
        <div style="display: flex; align-items: center; gap: 12px; color: #999">
          <div v-if="isEditing" style="display: flex; align-items: center; gap: 8px; cursor: pointer" @click="selectAll">
            Select all 
            <div :class="['checkbox', { checked: selectedMessages.length === messages.length && messages.length > 0 }]">
              <Check v-if="useDemoIcons" :size="14" color="white" />
              <img v-else :src="placeholderIcon" style="width: 14px; height: 14px;" />
            </div>
          </div>
          <div v-if="!isEditing" @click="isEditing = true" style="cursor: pointer">
            <Trash2 v-if="useDemoIcons" :size="22" />
            <img v-else :src="placeholderIcon" style="width: 22px; height: 22px;" />
          </div>
        </div>
      </div>
      <div v-if="messages.length > 0" class="card" style="margin: 0 16px; border-radius: 20px">
        <div v-for="msg in messages" :key="msg.id" class="system-msg-item" @click="isEditing ? toggleSelect(msg.id) : null">
          <div class="system-msg-icon">
            <Bell v-if="useDemoIcons" :size="20" color="#00D1FF" />
            <img v-else :src="placeholderIcon" style="width: 20px; height: 20px;" />
          </div>
          <div class="system-msg-content">
            <div class="system-msg-header">
              <div class="system-msg-title">{{ msg.title }}</div>
              <div v-if="msg.unread" class="system-msg-dot" />
            </div>
            <div class="system-msg-desc">{{ msg.desc }}</div>
            <div class="system-msg-time">{{ msg.time }}</div>
          </div>
          <div v-if="isEditing" style="align-self: center; margin-left: 8px">
            <div :class="['checkbox', { checked: selectedMessages.includes(msg.id) }]">
              <Check v-if="useDemoIcons" :size="14" color="white" />
              <img v-else :src="placeholderIcon" style="width: 14px; height: 14px;" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-message-container">
        <div class="no-message-icon">
          <Bell v-if="useDemoIcons" :size="80" color="#F0F0F0" />
          <img v-else :src="placeholderIcon" style="width: 80px; height: 80px; opacity: 0.1" />
        </div>
        <div class="no-message-text">No message</div>
      </div>

      <div v-if="isEditing" style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #EEE; display: flex; flex-direction: column; z-index: 100">
        <div style="display: flex; justify-content: space-around; padding: 12px 16px">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer" @click="showDelete">
            <Trash2 v-if="useDemoIcons" :size="20" />
            <img v-else :src="placeholderIcon" style="width: 20px; height: 20px;" />
            <span style="font-size: 12px">Delete</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer">
            <CheckCircle v-if="useDemoIcons" :size="20" />
            <img v-else :src="placeholderIcon" style="width: 20px; height: 20px;" />
            <span style="font-size: 12px">Read</span>
          </div>
        </div>
        <div style="height: 1px; background: #EEE; width: 100%"></div>
        <button style="width: 100%; padding: 16px; border: none; background: none; font-size: 16px; color: #333; cursor: pointer" @click="isEditing = false">Cancel</button>
      </div>
    </div>

    <!-- Local Modals -->
    <DeleteModal :show="showDeleteModal" @close="showDeleteModal = false" @confirm="deleteSelected" />
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

.header-right {
  position: absolute;
  right: 16px;
  display: flex;
  gap: 12px;
}

.content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.card {
  background: var(--card-bg);
  border-radius: 20px;
  margin-bottom: 16px;
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
  margin-bottom: 4px;
}

.system-msg-title {
  font-size: 16px;
  font-weight: 500;
}

.system-msg-dot {
  width: 8px;
  height: 8px;
  background: var(--danger);
  border-radius: 50%;
}

.system-msg-desc {
  font-size: 14px;
  color: var(--text-medium);
  margin-bottom: 4px;
}

.system-msg-time {
  font-size: 12px;
  color: var(--text-light);
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
  flex-shrink: 0;
}

.checkbox.checked {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.no-message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  color: #999;
}

.no-message-icon {
  margin-bottom: 12px;
}

.no-message-text {
  font-size: 14px;
}
</style>
