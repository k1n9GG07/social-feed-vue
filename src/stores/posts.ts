import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Post } from '@/types'

const LOCAL_STORAGE_KEY = 'diary_posts'

export const usePostStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      posts.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load posts from localStorage', e)
    posts.value = []
  }

  watch(posts, (newPosts) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPosts))
    } catch (e) {
      console.error('Failed to save posts to localStorage', e)
    }
  }, { deep: true })

  const getPostById = computed(() => (id: string) => posts.value.find(p => p.id === id))

  function addPost(text: string) {
    if (!text.trim()) {
      throw new Error('Post text cannot be empty')
    }
    const newPost: Post = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      text,
      createdAt: Date.now()
    }
    posts.value.unshift(newPost)
  }

  function deletePost(id: string) {
    posts.value = posts.value.filter(p => p.id !== id)
  }

  function updatePost(id: string, text: string) {
    if (!text.trim()) {
      throw new Error('Post text cannot be empty')
    }
    const post = posts.value.find(p => p.id === id)
    if (post) {
      post.text = text
    } else {
      throw new Error(`Post with id ${id} not found`)
    }
  }

  return {
    posts,
    getPostById,
    addPost,
    deletePost,
    updatePost
  }
})
