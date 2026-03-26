import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Card from 'primevue/card'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'

import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.component('Card', Card)
app.component('Button', Button)
app.component('DataView', DataView)
app.component('InputNumber', InputNumber)

app.mount('#app')
