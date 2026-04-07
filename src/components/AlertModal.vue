<script setup>
import { defineProps, defineEmits } from 'vue';
import { TEXT } from '../constants/text';

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close', 'download']);

const downloadApp = () => {
  emit('download');
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="alert-header">{{ TEXT.revamp_sr_service_failed }}</div>
      <div class="alert-body">
        {{ TEXT.NMessage_failed1 }}<br/><br/>
        {{ TEXT.NMessage_failed2 }}
      </div>
      <div class="alert-footer">
        <button class="alert-btn" @click="downloadApp">{{ TEXT.ems_download_app_button }}</button>
        <div class="divider"></div>
        <button class="alert-btn alert-btn-secondary" @click="emit('close')">{{ TEXT.getit }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
  animation: scale-in 0.2s ease-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.alert-header {
  padding: 24px 20px 12px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #000;
}

.alert-body {
  padding: 0 24px 24px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  text-align: left;
}

.alert-footer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #EEE;
}

.alert-btn {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 500;
  color: #00A9A5; /* Theme primary color */
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
}

.alert-btn:active {
  background-color: #F9F9F9;
}

.divider {
  height: 1px;
  background: #EEE;
  width: 100%;
}

.alert-btn-secondary {
  /* Same as primary in the screenshot */
}
</style>
