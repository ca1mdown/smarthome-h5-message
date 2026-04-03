<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-vue-next';
import AlertModal from '../components/AlertModal.vue';
import TimePickerModal from '../components/TimePickerModal.vue';

const router = useRouter();
const pushEnabled = ref(true);
const dndEnabled = ref(true);
const marketing = ref(true);
const interactive = ref(false);
const startTime = ref('23:49');
const endTime = ref('06:20');

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

// Placeholder for missing icons
const placeholderIcon = 'https://picsum.photos/seed/placeholder/24/24?grayscale';

// Set to false to use your custom images
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
      <div class="tab-item" @click="router.push('/center')">Message Center</div>
      <div class="tab-item active">Message Settings</div>
    </div>
    <div class="content">
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

      <div class="bottom-tip">
        <Lightbulb v-if="useDemoIcons" :size="20" class="tip-icon" />
        <img v-else src="https://ais-dev-h4jglydwyiqxmmllrevn26-622377507127.europe-west2.run.app/input_file_4.png" style="width: 20px; height: 20px;" class="tip-icon" />
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
