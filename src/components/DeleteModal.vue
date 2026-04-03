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
        <div style="text-align: center; color: #999; padding: 10px 0">Are you sure to delete the selected message(s)?</div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn modal-btn-cancel" @click="emit('close')">Cancel</button>
        <button class="modal-btn modal-btn-confirm" @click="emit('confirm')">Delete</button>
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
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 375px;
  border-radius: 20px 20px 0 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
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
  color: var(--danger);
  font-weight: 600;
}
</style>
