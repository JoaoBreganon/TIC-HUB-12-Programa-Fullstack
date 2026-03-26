<template>
  <div class="min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-50 text-slate-900">
    <header class="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-indigo-100">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-indigo-900">TechStore V4</h1>
      </div>
      <nav class="flex gap-3 items-center">
        <RouterLink class="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition" to="/">Vitrine</RouterLink>
        <RouterLink class="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition" to="/checkout">Checkout</RouterLink>
        <RouterLink class="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition" to="/admin">Admin</RouterLink>
      </nav>
      <!-- Mock Auth Switcher -->
      <div class="flex flex-wrap gap-2 text-sm">
         <span v-if="auth.isAuthenticated" class="font-semibold text-indigo-600 self-center mr-2">Role: {{ auth.userRole }}</span>
         <Button v-if="!auth.isAuthenticated" size="small" label="Login Admin" severity="info" @click="auth.loginAsAdmin()" />
         <Button v-if="!auth.isAuthenticated" size="small" label="Login User" severity="success" @click="auth.loginAsUser()" />
         <Button v-if="auth.isAuthenticated" size="small" label="Sair" severity="danger" @click="handleLogout" />
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <!-- Main Content Area -->
      <div class="flex-1">
        <RouterView />
      </div>

      <!-- Persistent Cart Aside -->
      <aside class="w-full lg:w-96 bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-6">
        <h2 class="text-xl font-semibold mb-4">Seu Carrinho</h2>

        <div v-if="cart.items.length === 0" class="text-sm text-slate-500">
          Seu carrinho está vazio. Adicione um produto.
        </div>

        <DataView v-else :value="cart.items" class="space-y-4">
          <template #list="slotProps">
            <div class="flex flex-col gap-4">
              <div v-for="(item, index) in slotProps.items" :key="index" class="flex flex-col gap-3 p-4 border rounded-xl bg-slate-50">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <img v-if="item.product.image" :src="item.product.image" class="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div class="font-semibold text-sm">{{ item.product.name }}</div>
                      <div class="text-xs text-slate-500">R$ {{ (item.product.price * item.quantity).toFixed(2) }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <InputNumber v-model="item.quantity" :min="1" :showButtons="true" buttonLayout="horizontal" style="width: 7rem" />
                  <Button icon="pi pi-trash" class="p-button-danger p-button-text p-button-sm" @click="cart.remove(item.product.id)" />
                </div>
              </div>
            </div>
          </template>
        </DataView>

        <div v-if="cart.items.length" class="mt-6 border-t pt-4">
          <div class="flex justify-between text-sm text-slate-600">
            <span>Total</span>
            <span class="font-semibold text-lg text-indigo-700">R$ {{ cart.total.toFixed(2) }}</span>
          </div>
          <Button label="Ir para Checkout" icon="pi pi-check" class="w-full mt-4" @click="router.push('/checkout')" />
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()

const handleLogout = () => {
  auth.logout()
  router.push('/')
}
</script>
