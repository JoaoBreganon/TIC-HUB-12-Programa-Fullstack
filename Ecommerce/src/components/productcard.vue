<template>
  <article>
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Preço: R$ {{ product.price.toFixed(2) }}</p>
    <button @click="additem(product)">Adicionar ao Carrinho</button>
  </article>
</template>

<script lang="ts">
import { Product } from '../model/product.model';
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  emits: ['onClick'],
  methods: {
    additem(product: Product) {
      this.$emit('onClick', product);
    }
  }
});

</script>
