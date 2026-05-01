<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-slate-800">Vitrine de Produtos</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in catalog.products"
        :key="product.id"
        :product="product"
        @add-to-cart="cart.add(product)"
      >
        <template #actions>
           <Button label="Ver Detalhes" icon="pi pi-search" class="w-full mt-2 p-button-outlined" size="small" @click="router.push(`/product/${product.id}`)" />
        </template>
      </ProductCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useCatalogStore } from '@/stores/catalog'
import { useCartStore } from '@/stores/cart'

const catalog = useCatalogStore()
const cart = useCartStore()
const router = useRouter()
</script>
