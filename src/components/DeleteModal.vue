<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close', 'confirm']);
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <div class="modal-title">Are you sure to delete the selected message(s)?</div>
      </div>
      <div class="modal-action-item delete" @click="emit('confirm')">
        Delete
      </div>
      <div class="modal-divider"></div>
      <div class="modal-action-item cancel" @click="emit('close')">
        Cancel
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

.modal-body {
  padding: 20px 16px;
  background: white;
  text-align: center;
  border-bottom: 1px solid #F0F0F0;
}

.modal-title {
  font-size: 14px;
  color: #999;
  line-height: 1.4;
}

.modal-action-item {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: white;
  cursor: pointer;
}

.modal-action-item.delete {
  color: #FF3B30;
}

.modal-action-item.cancel {
  color: #333;
}

.modal-divider {
  height: 8px;
  background: #F8F8F8;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
