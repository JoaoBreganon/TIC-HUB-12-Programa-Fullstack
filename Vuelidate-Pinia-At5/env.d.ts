/// <reference types="vite/client" />

/**
 * Declaração para resolver conflitos de tipo do vue-demi
 * usado internamente pelo Vuelidate.
 */
declare module 'vue-demi' {
  export * from 'vue'
}
