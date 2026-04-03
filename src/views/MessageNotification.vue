<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight, Megaphone, Flag, MessageSquare, Lightbulb } from 'lucide-vue-next';
import AlertModal from '../components/AlertModal.vue';
import TimePickerModal from '../components/TimePickerModal.vue';

const router = useRouter();
const activeTab = ref('center'); // 'center' or 'settings'

// Settings State
const pushEnabled = ref(true);
const dndEnabled = ref(true);
const marketing = ref(true);
const interactive = ref(false);
const startTime = ref('23:49');
const endTime = ref('06:20');

// Modal State
const showAlert = ref(false);
const showTimePicker = ref(false);
const timePickerType = ref('Starts');
const initialTime = ref('23:49');

const togglePush = () => {
  if (!pushEnabled.value) {
    showAlert.value = true;
  } else {
    pushEnabled.value = false;
  }
};

const openTimePicker = (type) => {
  timePickerType.value = type;
  initialTime.value = type === 'Starts' ? startTime.value : endTime.value;
  showTimePicker.value = true;
};

const handleTimeSaved = (time) => {
  if (timePickerType.value === 'Starts') {
    startTime.value = time;
  } else {
    endTime.value = time;
  }
  showTimePicker.value = false;
};

const downloadApp = () => {
  console.log('Download App clicked');
  showAlert.value = false;
  // Implement download logic here
};

const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';
const useDemoIcons = true;
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
    <div class="tabs">
      <div :class="['tab-item', { active: activeTab === 'center' }]" @click="activeTab = 'center'">Message Center</div>
      <div :class="['tab-item', { active: activeTab === 'settings' }]" @click="activeTab = 'settings'">Message Settings</div>
    </div>

    <div class="content">
      <!-- Message Center Content -->
      <div v-if="activeTab === 'center'">
        <div class="category-list">
          <div class="category-item" @click="router.push('/system')">
            <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00D1FF' : 'transparent' }">
              <Megaphone v-if="useDemoIcons" :size="20" />
              <img v-else :src="'/megaphone.png'" style="width: 40px; height: 40px;" />
            </div>
            <div class="category-info">
              <div class="category-name">Marketing Messages</div>
            </div>
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
            <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
            <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
          </div>
          <div class="category-item" @click="router.push('/system')">
            <div class="category-icon-wrapper" :style="{ background: useDemoIcons ? '#00A9A5' : 'transparent' }">
              <MessageSquare v-if="useDemoIcons" :size="20" />
              <img v-else :src="'/message-square.png'" style="width: 40px; height: 40px;" />
            </div>
            <div class="category-info">
              <div class="category-name">Interactive Message</div>
            </div>
            <ChevronRight v-if="useDemoIcons" :size="20" color="#CCC" />
            <img v-else :src="'/chevron-right.png'" style="width: 20px; height: 20px;" />
          </div>
        </div>
      </div>

      <!-- Message Settings Content -->
      <div v-else>
        <div class="card">
          <div class="card-item">
            <div class="card-item-left">
              <div class="card-item-title">Push Notifications</div>
              <div class="card-item-desc">Enable "Push Notifications" to receive notifications in real time.</div>
            </div>
            <button :class="pushEnabled ? 'btn-enabled' : 'btn-enable'" @click="togglePush">
              {{ pushEnabled ? "Enabled" : "Enable" }}
            </button>
          </div>
        </div>

        <div :class="{ disabled: !pushEnabled }">
          <div class="section-title">Do not disturb</div>
          <div class="card">
            <div class="card-item">
              <div class="card-item-title">Do Not Disturb during Set Time</div>
              <div :class="['switch', { active: dndEnabled }]" @click="dndEnabled = !dndEnabled">
                <div class="switch-handle" />
              </div>
            </div>
            <div v-if="dndEnabled">
              <div class="card-item" style="cursor: pointer" @click="openTimePicker('Starts')">
                <div class="card-item-title">Starts</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #999">
                  {{ startTime }} 
                  <ChevronRight v-if="useDemoIcons" :size="16" />
                  <img v-else src="https://ais-dev-h4jglydwyiqxmmllrevn26-622377507127.europe-west2.run.app/input_file_0.png" style="width: 16px; height: 16px;" />
                </div>
              </div>
              <div class="card-item" style="cursor: pointer" @click="openTimePicker('Ends')">
                <div class="card-item-title">Ends</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #999">
                  Next day {{ endTime }} 
                  <ChevronRight v-if="useDemoIcons" :size="16" />
                  <img v-else src="https://ais-dev-h4jglydwyiqxmmllrevn26-622377507127.europe-west2.run.app/input_file_0.png" style="width: 16px; height: 16px;" />
                </div>
              </div>
            </div>
          </div>

          <div class="section-title">By message type</div>
          <div class="card">
            <div class="card-item">
              <div class="card-item-left">
                <div class="card-item-title">Marketing Messages</div>
                <div class="card-item-desc">Receive marketing campaign</div>
              </div>
              <div :class="['switch', { active: marketing }]" @click="marketing = !marketing">
                <div class="switch-handle" />
              </div>
            </div>
            <div class="card-item">
              <div class="card-item-left">
                <div class="card-item-title">Interactive Message</div>
                <div class="card-item-desc">Receive product interaction messages</div>
              </div>
              <div :class="['switch', { active: interactive }]" @click="interactive = !interactive">
                <div class="switch-handle" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Bottom Tip -->
      <div class="bottom-tip">
        <Lightbulb v-if="useDemoIcons" :size="20" class="tip-icon" />
        <img v-else src="https://picsum.photos/seed/placeholder/20/20?grayscale" style="width: 20px; height: 20px;" class="tip-icon" />
        <div class="tip-text">
          Click <span class="tip-link" @click="downloadApp">"Download App"</span> for faster and more stable message push notifications.
        </div>
      </div>
    </div>

    <!-- Local Modals -->
    <AlertModal :show="showAlert" @close="showAlert = false" @download="downloadApp" />
    <TimePickerModal 
      :show="showTimePicker" 
      :type="timePickerType" 
      :initial-time="initialTime"
      @close="showTimePicker = false" 
      @save="handleTimeSaved" 
    />
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

.tabs {
  display: flex;
  justify-content: space-around;
  padding: 8px 16px;
  background: var(--bg-gray);
  position: sticky;
  top: 51px;
  z-index: 9;
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

.card {
  background: var(--card-bg);
  border-radius: 20px;
  margin-bottom: 16px;
  overflow: hidden;
}

.card-item {
  min-height: 64px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.card-item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 16px;
  height: 1px;
  background: var(--border);
}

.card-item-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-item-title {
  font-size: 16px;
  font-weight: 500;
}

.card-item-desc {
  font-size: 13px;
  color: var(--text-light);
}

.switch {
  width: 40px;
  height: 22px;
  background: #FFFFFF;
  border: 2px solid #D1D1D6;
  border-radius: 11px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}

.switch.active {
  background: var(--primary);
  border-color: var(--primary);
}

.switch-handle {
  width: 10px;
  height: 10px;
  background: #D1D1D6;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.switch.active .switch-handle {
  width: 18px;
  height: 18px;
  top: 0px;
  left: 18px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-enable {
  background: var(--primary);
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
}

.btn-enabled {
  background: #F0F0F0;
  color: var(--text-light);
  border: none;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
}

.section-title {
  font-size: 13px;
  color: var(--text-medium);
  margin: 16px 0 8px 16px;
}

.disabled {
  opacity: 0.4;
  pointer-events: none;
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
