import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(username, password) {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        throw new Error('Sai tài khoản hoặc mật khẩu')
      }

      const data = await res.json()

      this.token = data.access_token
      this.user = { username }

      localStorage.setItem('access_token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    async register(username, password) {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Đăng ký thất bại')
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
    },
  },
})
