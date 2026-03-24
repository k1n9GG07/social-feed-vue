<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  initialText: string
}>()

const emit = defineEmits(['save', 'close'])

const text = ref(props.initialText)

watch(() => props.initialText, (newVal) => {
  text.value = newVal
})

const handleSave = () => {
  emit('save', text.value)
}

const handleClose = () => {
  text.value = props.initialText
  emit('close')
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content card">
      <header class="modal-header">
        <h2>Редактировать пост</h2>
        <button class="btn-close" @click="handleClose" aria-label="Закрыть модальное окно">✕</button>
      </header>
      <div class="modal-body">
        <textarea v-model="text" rows="5"></textarea>
      </div>
      <footer class="modal-footer">
        <button class="btn-secondary" @click="handleClose">Закрыть</button>
        <button class="btn-primary" @click="handleSave">Сохранить</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  background: var(--fb-white);
  padding: 0;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.card {
  border-radius: var(--fb-radius);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--fb-border);
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.btn-close {
  background: #e4e6eb;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #606770;
}

.modal-body {
  padding: 16px;
}

.modal-body textarea {
  width: 100%;
  outline: none;
  font-size: 18px;
  border: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--fb-border);
}

.btn-secondary {
  background: #e4e6eb;
  color: #050505;
}

.btn-primary {
  background: var(--fb-blue);
  color: white;
}
</style>
