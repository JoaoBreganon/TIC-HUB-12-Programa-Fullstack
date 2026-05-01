import { defineStore } from 'pinia'

/**
 * Interface representando o usuário autenticado.
 */
interface User {
  name: string
  email: string
}

/**
 * authStore — única fonte da verdade para autenticação.
 * Gerencia user, token, isAuthenticated e userRole.
 * Todas as actions simulam delay de rede com Promise + setTimeout.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
    userRole: 'GUEST' as 'GUEST' | 'USER' | 'ADMIN',
  }),

  getters: {
    userName: (state): string => state.user?.name ?? '',
    userEmail: (state): string => state.user?.email ?? '',
  },

  actions: {
    /**
     * Simula login com delay de 1.5s.
     * - admin@test.com / 123456 → loga como ADMIN
     * - qualquer outro email com senha válida → loga como USER
     * - senha incorreta para admin → rejeita
     */
    async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Credencial de admin
      if (email === 'admin@test.com') {
        if (password === '123456') {
          this.user = { name: 'Administrador', email }
          this.token = 'fake-admin-jwt-token-' + Date.now()
          this.isAuthenticated = true
          this.userRole = 'ADMIN'
          return { success: true, message: 'Login realizado com sucesso!' }
        }
        return { success: false, message: 'Credenciais inválidas.' }
      }

      // Qualquer outro email — loga como USER (simulação)
      if (password.length >= 1) {
        this.user = { name: email.split('@')[0], email }
        this.token = 'fake-user-jwt-token-' + Date.now()
        this.isAuthenticated = true
        this.userRole = 'USER'
        return { success: true, message: 'Login realizado com sucesso!' }
      }

      return { success: false, message: 'Credenciais inválidas.' }
    },

    /**
     * Simula registro de novo usuário com delay de 1.5s.
     * Após registrar, já faz login automático como USER.
     */
    async register(
      name: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; message: string }> {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulação: bloqueia email já "cadastrado"
      if (email === 'admin@test.com') {
        return { success: false, message: 'Este e-mail já está cadastrado.' }
      }

      this.user = { name, email }
      this.token = 'fake-user-jwt-token-' + Date.now()
      this.isAuthenticated = true
      this.userRole = 'USER'
      return { success: true, message: 'Conta criada com sucesso!' }
    },

    /**
     * Limpa todo o estado de autenticação.
     */
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.userRole = 'GUEST'
    },
  },
})
