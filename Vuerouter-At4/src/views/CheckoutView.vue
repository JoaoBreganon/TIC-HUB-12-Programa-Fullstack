<template>
  <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <i class="pi pi-check-circle text-indigo-600"></i> Checkout
    </h2>
    <div v-if="cart.items.length === 0" class="text-slate-600 mb-4 bg-slate-50 p-6 rounded-xl text-center border border-slate-200 border-dashed">
      Seu carrinho está vazio. Volte para a vitrine e adicione produtos antes de finalizar a compra.
    </div>
    <div v-else class="space-y-6">
      <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 class="font-bold text-indigo-900 mb-2">Resumo do Pedido</h3>
          <p class="text-indigo-700">Você está prestes a finalizar uma compra com <strong>{{ cart.itemCount }} origens de itens</strong>, totalizando <strong class="text-xl">R$ {{ cart.total.toFixed(2) }}</strong>.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div class="space-y-4">
             <h3 class="font-semibold text-slate-700 border-b pb-2">Endereço de Entrega</h3>
             <input type="text" placeholder="CEP" class="w-full p-2 border rounded border-slate-300 focus:border-indigo-500 outline-none" />
             <input type="text" placeholder="Rua" class="w-full p-2 border rounded border-slate-300 focus:border-indigo-500 outline-none" />
             <input type="text" placeholder="Número" class="w-full p-2 border rounded border-slate-300 focus:border-indigo-500 outline-none" />
         </div>
         <div class="space-y-4">
             <h3 class="font-semibold text-slate-700 border-b pb-2">Pagamento</h3>
             <select class="w-full p-2 border rounded border-slate-300 focus:border-indigo-500 outline-none">
                 <option>Cartão de Crédito</option>
                 <option>PIX</option>
                 <option>Boleto</option>
             </select>
         </div>
      </div>
      
      <div class="pt-6 border-t border-slate-100 flex justify-end gap-4">
          <Button label="Voltar à Vitrine" class="p-button-text p-button-secondary" @click="router.push('/')" />
          <Button label="Confirmar Compra" icon="pi pi-check" size="large" severity="success" @click="finishCheckout" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cart = useCartStore()

const finishCheckout = () => {
    alert('Compra finalizada com sucesso!')
    cart.clear()
    router.push('/')
}
</script>
