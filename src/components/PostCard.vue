<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Post } from '@/types'
import { usePostStore } from '@/stores/posts'
import { useCommentStore } from '@/stores/comments'
import CommentItem from './CommentItem.vue'
import CommentForm from './CommentForm.vue'
import ModalEditor from './ModalEditor.vue'

const props = defineProps<{
  post: Post
}>()

const postStore = usePostStore()
const commentStore = useCommentStore()

const isShow = ref(false)
const showEditor = ref(false)

const comments = computed(() => commentStore.getCommentsByPostId(props.post.id))

const handleDeletePost = () => {
  postStore.deletePost(props.post.id)
  commentStore.deleteCommentsByPostId(props.post.id)
}

const handleEditPost = () => {
  showEditor.value = true
}

const handleSaveEdit = (newText: string) => {
  postStore.updatePost(props.post.id, newText)
  showEditor.value = false
}

const toggleComments = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <div class="post-card card">
    <div class="post-header">
      <div class="user-info">
        <div class="avatar">👤</div>
        <div class="meta">
          <span class="user-name">Мой дневник</span>
          <span class="timestamp">{{ new Date(post.createdAt).toLocaleString() }}</span>
        </div>
      </div>
      <div class="post-actions">
        <button class="btn-icon" @click="handleEditPost" title="Редактировать" aria-label="Редактировать">✏️</button>
        <button class="btn-icon btn-delete" @click="handleDeletePost" title="Удалить" aria-label="Удалить">🗑️</button>
      </div>
    </div>

    <div class="post-content">
      <p>{{ post.text }}</p>
    </div>

    <div class="post-footer">
      <div class="footer-stats">
        <span class="comments-count">{{ comments.length }} комментариев</span>
      </div>
      <div class="footer-buttons">
        <button class="btn-footer" @click="toggleComments">
          {{ isShow ? 'Скрыть комментарии' : 'Показать комментарии' }}
        </button>
      </div>
    </div>

    <div v-if="isShow" class="comments-section">
      <div class="comments-list">
        <CommentItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
      <CommentForm :postId="post.id" />
    </div>

    <ModalEditor
      :show="showEditor"
      :initialText="post.text"
      @save="handleSaveEdit"
      @close="showEditor = false"
    />
  </div>
</template>

<style scoped>
.post-card {
  background: var(--fb-white);
  border-radius: var(--fb-radius);
  box-shadow: var(--fb-shadow);
  display: flex;
  flex-direction: column;
}

.card {
  padding: 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  align-items: center;
}

.user-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #e4e6eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.meta {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 15px;
}

.timestamp {
  font-size: 13px;
  color: var(--fb-text-secondary);
}

.post-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  padding: 8px;
  font-size: 18px;
  color: var(--fb-text-secondary);
  border-radius: 50%;
}

.btn-icon:hover {
  background: #f2f2f2;
}

.btn-delete:hover {
  color: #fa383e;
}

.post-content {
  padding: 4px 16px 16px;
  font-size: 15px;
  white-space: pre-wrap;
}

.post-footer {
  padding: 10px 16px;
  border-top: 1px solid var(--fb-border);
}

.footer-stats {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 8px;
  font-size: 14px;
  color: var(--fb-text-secondary);
}

.footer-buttons {
  display: flex;
  border-top: 1px solid var(--fb-border);
  padding-top: 4px;
}

.btn-footer {
  flex: 1;
  background: none;
  color: var(--fb-text-secondary);
  font-weight: 600;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
}

.btn-footer:hover {
  background: #f2f2f2;
}

.comments-section {
  border-top: 1px solid var(--fb-border);
  padding: 12px 0;
}

.comments-list {
  padding: 0 16px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
