<script setup lang="ts">
import { ref } from 'vue'
import { useCommentStore } from '@/stores/comments'

const props = defineProps<{
  postId: string
}>()

const commentStore = useCommentStore()
const text = ref('')

const handleSubmit = () => {
  if (text.value.trim()) {
    commentStore.addComment(props.postId, text.value)
    text.value = ''
  }
}
</script>

<template>
  <div class="comment-form">
    <div class="input-container">
      <textarea 
        v-model="text" 
        placeholder="Напишите комментарий..." 
        rows="1"
        @keydown.enter.exact.prevent="handleSubmit"
      ></textarea>
      <button 
        @click="handleSubmit" 
        :disabled="!text.trim()" 
        class="btn-send"
        aria-label="Отправить комментарий"
      >
        ➡️
      </button>
    </div>
  </div>
</template>

<style scoped>
.comment-form {
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.input-container {
  flex: 1;
  position: relative;
  background-color: #f0f2f5;
  border-radius: 20px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
}

textarea {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  resize: none;
  padding: 4px 0;
  max-height: 100px;
  overflow-y: auto;
}

.btn-send {
  background: none;
  padding: 0;
  color: var(--fb-blue);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-send:disabled {
  color: #bcc0c4;
}
</style>
