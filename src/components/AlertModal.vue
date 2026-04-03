<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close', 'download']);

const downloadApp = () => {
  emit('download');
};
</script>

<template>
  <div v-if="show" class="modal-overlay" style="align-items: center">
    <div class="alert-modal">
      <div class="alert-header">Failed</div>
      <div class="alert-body">
        1.Failed to open. It is recommended to delete the home screen shortcut and clear the current browser cache, then re-add the app to the home screen and try to open it again.<br/><br/>
        2.If it still cannot be opened, it is recommended to download the APP, which will push messages faster and more stably.
      </div>
      <div class="alert-footer">
        <button class="alert-btn" @click="downloadApp">Download APP</button>
        <button class="alert-btn alert-btn-secondary" @click="emit('close')">I know</button>
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
  z-index: 100;
}

.alert-modal {
  background: white;
  width: 85%;
  max-width: 320px;
  border-radius: 16px;
  z-index: 110;
  overflow: hidden;
}

.alert-header {
  padding: 20px 20px 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.alert-body {
  padding: 0 20px 20px;
  font-size: 14px;
  color: var(--text-dark);
  line-height: 1.6;
}

.alert-footer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.alert-btn {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
  border: none;
  background: none;
}

.alert-btn-secondary {
  border-top: 1px solid var(--border);
  color: var(--text-medium);
  font-weight: 400;
}
</style>
