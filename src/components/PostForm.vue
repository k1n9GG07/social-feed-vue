<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/posts'

const postStore = usePostStore()
const text = ref('')

const handleSubmit = () => {
  if (text.value.trim()) {
    postStore.addPost(text.value)
    text.value = ''
  }
}
</script>

<template>
  <div class="post-form card">
    <textarea 
      v-model="text" 
      placeholder="Что у вас нового?" 
      rows="3"
    ></textarea>
    <div class="form-footer">
      <button @click="handleSubmit" :disabled="!text.trim()" class="btn-primary">
        Добавить
      </button>
    </div>
  </div>
</template>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  background: var(--fb-white);
  border-radius: var(--fb-radius);
  padding: 16px;
  box-shadow: var(--fb-shadow);
}

textarea {
  width: 100%;
  border: 1px solid var(--fb-border);
  background-color: #f0f2f5;
  outline: none;
}

textarea:focus {
  background-color: var(--fb-white);
  border-color: var(--fb-blue);
}

.form-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background-color: var(--fb-blue);
  color: white;
}

.btn-primary:disabled {
  background-color: #e4e6eb;
  color: #bcc0c4;
  cursor: not-allowed;
}
</style>
