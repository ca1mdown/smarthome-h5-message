<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { TimePicker } from 'vant';
import { TEXT } from '../constants/text';

const props = defineProps({
  show: Boolean,
  type: String,
  initialTime: String
});

const emit = defineEmits(['close', 'save']);

const currentTime = ref(['23', '49']);

watch(() => props.initialTime, (newVal) => {
  if (newVal) {
    currentTime.value = newVal.split(':');
  }
}, { immediate: true });

const onConfirmTime = () => {
  emit('save', currentTime.value.join(':'));
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">{{ type }}</div>
      <div class="modal-body" style="padding: 0">
        <TimePicker
          v-model="currentTime"
          :show-toolbar="false"
          :visible-option-num="5"
          style="height: 200px"
        />
      </div>
      <div class="modal-footer">
        <button class="modal-btn modal-btn-cancel" @click="emit('close')">{{ TEXT.modal_cancel }}</button>
        <button class="modal-btn modal-btn-confirm" @click="onConfirmTime">{{ TEXT.modal_save }}</button>
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
  padding-bottom: env(safe-area-inset-bottom, 16px);
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

.modal-header {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  border-top: 1px solid var(--border);
}

.modal-btn {
  flex: 1;
  padding: 16px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background: none;
}

.modal-btn-cancel {
  color: var(--text-dark);
  border-right: 1px solid var(--border);
}

.modal-btn-confirm {
  color: var(--primary);
  font-weight: 600;
}
</style>
