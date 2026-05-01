<template>
  <div class="min-h-screen flex bg-slate-50 text-slate-900 border-t-4 border-indigo-600">
    <!-- barra lateral -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
      <div class="p-6 pb-2 border-b border-slate-700">
        <h2 class="text-2xl font-black tracking-tight text-white mb-4">TechStore</h2>
        <span class="text-xs uppercase font-semibold tracking-wider text-indigo-400">Admin Panel</span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <RouterLink to="/admin" class="block px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium transition hover:bg-indigo-500">Dashboard</RouterLink>
        <RouterLink to="/" class="block px-4 py-3 rounded-lg text-slate-300 font-medium transition hover:bg-slate-800 hover:text-white">Voltar para Loja</RouterLink>
      </nav>
      <div class="p-6 border-t border-slate-700">
         <Button label="Sair (Logout)" class="w-full" size="small" severity="danger" @click="logout" />
      </div>
    </aside>

    <!-- conteudo -->
    <main class="flex-1 flex flex-col max-h-screen overflow-y-auto">
      <header class="bg-white px-8 py-5 border-b border-slate-200 flex justify-between items-center shadow-sm z-10 sticky top-0">
        <h1 class="text-xl font-bold text-slate-800">Painel de Controle</h1>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {{ auth.userName.charAt(0).toUpperCase() }}
          </div>
          <div class="text-sm font-medium text-slate-600">{{ auth.userName }}</div>
        </div>
      </header>
      <div class="p-8 flex-1">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const logout = () => {
    auth.logout()
    toast.add({ severity: 'info', summary: 'Logout', detail: 'Você saiu da sua conta.', life: 3000 })
    router.push({ name: 'login' })
}

// Reage a mudanças de autenticação globalmente para este layout
auth.$subscribe((_mutation, state) => {
  if (!state.isAuthenticated || state.userRole !== 'ADMIN') {
     router.push({ name: 'login' })
  }
})
</script>
