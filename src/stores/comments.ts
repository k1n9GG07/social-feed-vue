import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Comment } from '@/types'

const LOCAL_STORAGE_KEY = 'diary_comments'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      comments.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load comments from localStorage', e)
    comments.value = []
  }

  watch(comments, (newComments) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newComments))
    } catch (e) {
      console.error('Failed to save comments to localStorage', e)
    }
  }, { deep: true })

  const getCommentsByPostId = computed(() => (postId: string) => 
    comments.value.filter(c => c.postId === postId).sort((a, b) => b.createdAt - a.createdAt)
  )

  function addComment(postId: string, text: string) {
    if (!text.trim()) {
      throw new Error('Comment text cannot be empty')
    }
    const newComment: Comment = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      postId,
      text,
      createdAt: Date.now()
    }
    comments.value.unshift(newComment)
  }

  function deleteComment(id: string) {
    comments.value = comments.value.filter(c => c.id !== id)
  }

  function updateComment(id: string, text: string) {
    if (!text.trim()) {
      throw new Error('Comment text cannot be empty')
    }
    const comment = comments.value.find(c => c.id === id)
    if (comment) {
      comment.text = text
    } else {
      throw new Error(`Comment with id ${id} not found`)
    }
  }

  function deleteCommentsByPostId(postId: string) {
    comments.value = comments.value.filter(c => c.postId !== postId)
  }

  return {
    comments,
    getCommentsByPostId,
    addComment,
    deleteComment,
    updateComment,
    deleteCommentsByPostId
  }
})
