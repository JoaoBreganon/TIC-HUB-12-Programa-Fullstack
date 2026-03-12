<script lang="ts">
import { Product } from './model/product.model';
import ProductCard from './components/productcard.vue';
import { cart } from './model/cart.model';

export default {
  components: { ProductCard },
  data() {
    return {
      cart: new cart([], 0),
      products: [
        new Product('Produto 1', 'Descrição do Produto 1', 10.0, 2),
        new Product('Produto 2', 'Descrição do Produto 2', 20.0, 5)
      ]
    };
  },
  methods: {
    additem(product: Product) {
    
      const existingItem = this.cart.list.find(item => item.title === product.title);
      if (!existingItem) {
        this.cart.list.push(product);
        this.cart.total = this.cart.list.length;
      }
    },
    removeitem() {
      if (this.cart.total > 0) {
        this.cart.list.pop();
        this.cart.total = this.cart.list.length;
      }
    }
  }
};

</script>

<template>
  <main>
    <div>
    
      <ProductCard
        v-for="product in products"
        :key="product.title"
        :product="product"
        @onClick="additem"
      />
    </div>

    <section>
      <h1>Meu carrinho</h1>
      <ul>
        <li v-for="item in cart.list" :key="item.title">
          {{ item.title }} - R$ {{ item.price.toFixed(2) }}
        </li>
      </ul>
      <p>Total de itens: {{ cart.total }}</p>
      <button @click="removeitem" :disabled="cart.total === 0">Remover Item</button>
    </section>
  </main>
</template>