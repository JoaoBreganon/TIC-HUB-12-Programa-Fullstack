import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userRole: 'GUEST' as 'GUEST' | 'USER' | 'ADMIN',
  }),
  actions: {
    loginAsUser() {
      this.isAuthenticated = true;
      this.userRole = 'USER';
    },
    loginAsAdmin() {
      this.isAuthenticated = true;
      this.userRole = 'ADMIN';
    },
    logout() {
      this.isAuthenticated = false;
      this.userRole = 'GUEST';
    }
  }
});
