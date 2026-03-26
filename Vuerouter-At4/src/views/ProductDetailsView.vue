<template>
  <div v-if="product" class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
    <div class="md:w-1/2">
      <img :src="product.image" :alt="product.name" class="w-full rounded-2xl object-cover aspect-video md:aspect-square border border-slate-100 shadow-sm" />
    </div>
    <div class="md:w-1/2 flex flex-col pt-4">
      <Button icon="pi pi-arrow-left" label="Voltar à vitrine" class="p-button-text p-button-sm mb-4 self-start p-0 text-slate-500 hover:text-indigo-600" @click="router.push('/')" />
      
      <h1 class="text-3xl font-black text-slate-900 mb-2">{{ product.name }}</h1>
      <p class="text-slate-600 text-lg mb-6 leading-relaxed flex-1">{{ product.description }}</p>
      
      <div class="border-t border-slate-100 pt-6 mt-auto">
        <div class="text-3xl font-bold text-indigo-600 mb-4">R$ {{ product.price.toFixed(2) }}</div>
        <div class="flex gap-4 items-center">
            <InputNumber v-model="quantity" :min="1" :showButtons="true" buttonLayout="horizontal" class="w-32" />
            <Button label="Adicionar ao Carrinho" icon="pi pi-cart-plus" size="large" class="flex-1" @click="addToCart" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-20 text-slate-500">
    Produto não encontrado.
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const catalog = useCatalogStore()
const cart = useCartStore()

const productId = computed(() => route.params.id as string)
const product = computed(() => catalog.getProductById(productId.value))
const quantity = ref(1)

const addToCart = () => {
  if (product.value) {
    cart.add(product.value, quantity.value)
    router.push('/') // Optional redirect back to home after adding
  }
}
</script>
