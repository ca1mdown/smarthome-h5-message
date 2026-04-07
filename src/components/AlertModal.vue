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
  <div v-if="show" class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="alert-header">Failed</div>
      <div class="alert-body">
        1.Failed to open. It is recommended to delete the home screen shortcut and clear the current browser cache, then re-add the app to the home screen and try to open it again.<br/><br/>
        2.If it still cannot be opened, it is recommended to download the APP, which will push messages faster and more stably.
      </div>
      <div class="alert-footer">
        <button class="alert-btn" @click="downloadApp">Download APP</button>
        <div class="divider"></div>
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
  align-items: flex-end;
  z-index: 2000;
}

.modal-content {
  background: white;
  width: 100%;
  border-radius: 20px 20px 0 0;
  padding-bottom: max(16px, env(safe-area-inset-bottom, 0px));
  animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.alert-header {
  padding: 24px 20px 12px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.alert-body {
  padding: 0 24px 24px;
  font-size: 14px;
  color: var(--text-dark);
  line-height: 1.6;
  text-align: center;
}

.alert-footer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.alert-btn {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
  border: none;
  background: none;
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 0 16px;
}

.alert-btn-secondary {
  color: var(--text-medium);
  font-weight: 400;
}
</style>
