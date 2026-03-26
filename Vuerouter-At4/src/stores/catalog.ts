import { defineStore } from 'pinia'
import type { Product } from '@/models/product.model'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    products: [
        {
          id: 'p1',
          name: 'Tênis Esportivo',
          description: 'Leve e confortável para todas as atividades.',
          price: 249.9,
          image: 'https://picsum.photos/seed/tenis/600/400',
        },
        {
          id: 'p2',
          name: 'Fone de Ouvido',
          description: 'Som cristalino com cancelamento de ruído ativo.',
          price: 699.0,
          image: 'https://picsum.photos/seed/fone/600/400',
        },
        {
          id: 'p3',
          name: 'Mochila Compacta',
          description: 'Organização inteligente para o dia a dia.',
          price: 159.9,
          image: 'https://picsum.photos/seed/mochila/600/400',
        },
        {
          id: 'p4',
          name: 'Relógio Smart',
          description: 'Monitoramento de saúde e notificações direto no pulso.',
          price: 899.0,
          image: 'https://picsum.photos/seed/relogio/600/400',
        },
      ] as Product[]
  }),
  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(p => p.id === id)
    }
  }
})
