<script setup lang="ts">
import type { Comment } from '@/types'
import { useCommentStore } from '@/stores/comments'

const props = defineProps<{
  comment: Comment
}>()

const commentStore = useCommentStore()

const handleDelete = () => {
  commentStore.deleteComment(props.comment.id)
}
</script>

<template>
  <div class="comment-item">
    <div class="comment-content">
      <div class="comment-bubble">
        <span class="user-name">Пользователь</span>
        <p class="comment-text">{{ comment.text }}</p>
      </div>
      <div class="comment-actions">
        <button class="btn-text" @click="handleDelete">Удалить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.comment-bubble {
  background-color: #f0f2f5;
  border-radius: 18px;
  padding: 8px 12px;
  display: inline-block;
  max-width: 100%;
}

.user-name {
  font-weight: 600;
  font-size: 13px;
  display: block;
}

.comment-text {
  margin: 4px 0 0;
  font-size: 15px;
  word-wrap: break-word;
}

.comment-actions {
  display: flex;
  gap: 12px;
  margin-left: 12px;
  margin-top: 4px;
}

.btn-text {
  background: none;
  padding: 0;
  font-size: 12px;
  color: #65676b;
  font-weight: 600;
}

.btn-text:hover {
  text-decoration: underline;
}
</style>
