import { defineStore } from 'pinia'

const fakeUsers = [
  { id: 1, username: 'admin', password: '123456', name: 'Admin User' },
  { id: 2, username: 'huy', password: '123456', name: 'Huỳnh Lê Huy' }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    login(username, password) {
      const user = fakeUsers.find(
        (u) => u.username === username && u.password === password
      )
      if (!user) throw new Error('Sai tài khoản hoặc mật khẩu!')
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    register(username, password, name) {
      const exists = fakeUsers.find((u) => u.username === username)
      if (exists) throw new Error('Tên đăng nhập đã tồn tại!')
      const newUser = { id: Date.now(), username, password, name }
      fakeUsers.push(newUser)
      this.user = newUser
      localStorage.setItem('user', JSON.stringify(newUser))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
