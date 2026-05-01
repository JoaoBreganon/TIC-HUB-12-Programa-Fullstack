<template>
  <Card class="h-full shadow-lg rounded-xl overflow-hidden">
    <template #title>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ product.name }}</span>
        <span class="text-sm text-slate-600">R$ {{ product.price.toFixed(2) }}</span>
      </div>
    </template>

    <div class="space-y-3">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="w-full h-40 object-cover rounded-lg"
      />
      <p class="text-sm text-slate-600">{{ product.description }}</p>
    </div>

    <template #footer>
      <Button
        label="Adicionar"
        icon="pi pi-shopping-cart"
        class="w-full"
        @click="handleAddToCart"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '@/models/product.model'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  emits: ['add-to-cart'],
  methods: {
    handleAddToCart() {
      this.$emit('add-to-cart', this.product)
    },
  },
})
</script>
