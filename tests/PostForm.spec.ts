import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PostForm from '../src/components/PostForm.vue'

describe('PostForm.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(PostForm)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Добавить')
  })

  it('button is disabled when textarea is empty', async () => {
    const wrapper = mount(PostForm)
    const button = wrapper.find('button')
    expect(button.element.disabled).toBe(true)
    
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Some text')
    expect(button.element.disabled).toBe(false)
  })

  it('clears textarea after submission', async () => {
    const wrapper = mount(PostForm)
    const textarea = wrapper.find('textarea')
    await textarea.setValue('New Post')
    await wrapper.find('button').trigger('click')
    
    expect(textarea.element.value).toBe('')
  })
})
