<script setup lang="ts">
import PostForm from './components/PostForm.vue'
import PostCard from './components/PostCard.vue'
import { usePostStore } from './stores/posts'
import { onMounted } from 'vue'

const postStore = usePostStore()

onMounted(() => {
  // Load initial data from localStorage if needed, or just some sample posts
  if (postStore.posts.length === 0) {
    postStore.addPost('Добро пожаловать в мой дневник! Это мой первый пост.')
  }
})
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">📖 Diary</div>
        <div class="search-bar">
          <input type="text" placeholder="Поиск в дневнике" />
        </div>
        <div class="user-profile">
          <span class="avatar-small">👤</span>
          <span class="user-name-small">Пользователь</span>
        </div>
      </div>
    </nav>

    <div class="app-container">
      <main class="main-content">
        <PostForm />
        <div class="posts-feed">
          <PostCard
            v-for="post in postStore.posts"
            :key="post.id"
            :post="post"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --fb-blue: #1877f2;
  --fb-green: #42b72a;
  --fb-gray: #f0f2f5;
  --fb-white: #ffffff;
  --fb-text-main: #1c1e21;
  --fb-text-secondary: #65676b;
  --fb-border: #dddfe2;
  --fb-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  --fb-radius: 8px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--fb-gray);
  color: var(--fb-text-main);
}

.app-layout {
  min-height: 100vh;
}

.navbar {
  background-color: var(--fb-white);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
}

.navbar-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--fb-blue);
}

.search-bar {
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

.search-bar input {
  width: 100%;
  background-color: var(--fb-gray);
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 15px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 20px;
}

.user-profile:hover {
  background-color: var(--fb-gray);
  cursor: pointer;
}

.avatar-small {
  width: 28px;
  height: 28px;
  background: #e4e6eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name-small {
  font-weight: 600;
  font-size: 14px;
}

.app-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 20px;
}

.posts-feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
</style>
