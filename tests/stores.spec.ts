import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostStore } from '../src/stores/posts'
import { useCommentStore } from '../src/stores/comments'
import { nextTick } from 'vue'

describe('Stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('Post Store', () => {
    it('should initialize with empty posts if localStorage is empty', () => {
      const postStore = usePostStore()
      expect(postStore.posts).toEqual([])
    })

    it('should add a valid post', () => {
      const postStore = usePostStore()
      postStore.addPost('Hello World')
      expect(postStore.posts.length).toBe(1)
      expect(postStore.posts[0].text).toBe('Hello World')
      expect(postStore.posts[0].id).toBeDefined()
    })

    it('should throw error when adding empty post', () => {
      const postStore = usePostStore()
      expect(() => postStore.addPost('   ')).toThrow('Post text cannot be empty')
    })

    it('should delete a post', () => {
      const postStore = usePostStore()
      postStore.addPost('To be deleted')
      const id = postStore.posts[0].id
      postStore.deletePost(id)
      expect(postStore.posts.length).toBe(0)
    })

    it('should update a post', () => {
      const postStore = usePostStore()
      postStore.addPost('Original')
      const id = postStore.posts[0].id
      postStore.updatePost(id, 'Updated')
      expect(postStore.posts[0].text).toBe('Updated')
    })

    it('should throw error when updating non-existent post', () => {
      const postStore = usePostStore()
      expect(() => postStore.updatePost('non-id', 'text')).toThrow('Post with id non-id not found')
    })
  })

  describe('Comment Store', () => {
    it('should add a valid comment to a post', () => {
      const commentStore = useCommentStore()
      commentStore.addComment('post-1', 'Nice post!')
      const comments = commentStore.getCommentsByPostId('post-1')
      expect(comments.length).toBe(1)
      expect(comments[0].text).toBe('Nice post!')
    })

    it('should throw error when adding empty comment', () => {
      const commentStore = useCommentStore()
      expect(() => commentStore.addComment('post-1', '')).toThrow('Comment text cannot be empty')
    })

    it('should delete comments by postId', () => {
      const commentStore = useCommentStore()
      commentStore.addComment('post-1', 'C1')
      commentStore.addComment('post-1', 'C2')
      commentStore.addComment('post-2', 'C3')
      
      commentStore.deleteCommentsByPostId('post-1')
      expect(commentStore.getCommentsByPostId('post-1').length).toBe(0)
      expect(commentStore.getCommentsByPostId('post-2').length).toBe(1)
    })
  })

  describe('Persistence', () => {
    it('should persist posts to localStorage', async () => {
      const postStore = usePostStore()
      postStore.addPost('Persisted Post')
      
      await nextTick() // Wait for watcher
      
      const stored = JSON.parse(localStorage.getItem('diary_posts') || '[]')
      expect(stored.length).toBe(1)
      expect(stored[0].text).toBe('Persisted Post')
    })
  })
})
