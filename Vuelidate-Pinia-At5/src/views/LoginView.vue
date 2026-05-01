<template>
  <div class="min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-lg">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-indigo-900">TechStore V5</h1>
        <p class="text-slate-500 mt-2">Faça login ou crie sua conta para continuar</p>
      </div>

      <Card class="shadow-xl border border-slate-100">
        <template #content>
          <Tabs :value="activeTab" @update:value="activeTab = $event">
            <TabList>
              <Tab value="login">
                <i class="pi pi-sign-in mr-2"></i>Login
              </Tab>
              <Tab value="register">
                <i class="pi pi-user-plus mr-2"></i>Criar Conta
              </Tab>
            </TabList>

            <TabPanels>
              <!--  ABA LOGIN  -->
              <TabPanel value="login">
                <form @submit.prevent="handleLogin" class="flex flex-col gap-5 pt-4">
                  <!-- Email -->
                  <div class="flex flex-col gap-1">
                    <label for="login-email" class="text-sm font-medium text-slate-700">E-mail</label>
                    <InputText
                      id="login-email"
                      v-model="loginForm.email"
                      placeholder="seu@email.com"
                      :invalid="loginV$.email.$error"
                      @blur="loginV$.email.$touch()"
                      class="w-full"
                    />
                    <small v-if="loginV$.email.$error" class="text-red-500 text-xs">
                      {{ loginV$.email.$errors[0]?.$message }}
                    </small>
                  </div>

                  <!-- Senha -->
                  <div class="flex flex-col gap-1">
                    <label for="login-password" class="text-sm font-medium text-slate-700">Senha</label>
                    <Password
                      id="login-password"
                      v-model="loginForm.password"
                      :feedback="false"
                      toggleMask
                      :invalid="loginV$.password.$error"
                      @blur="loginV$.password.$touch()"
                      inputClass="w-full"
                      class="w-full"
                    />
                    <small v-if="loginV$.password.$error" class="text-red-500 text-xs">
                      {{ loginV$.password.$errors[0]?.$message }}
                    </small>
                  </div>

                  <Button
                    type="submit"
                    label="Entrar"
                    icon="pi pi-sign-in"
                    :loading="loginLoading"
                    :disabled="loginV$.$invalid"
                    class="w-full mt-2"
                  />

                  <p class="text-xs text-slate-400 text-center mt-2">
                    <i class="pi pi-info-circle mr-1"></i>
                    Admin: <strong>admin@test.com</strong> / <strong>123456</strong>
                  </p>
                </form>
              </TabPanel>

              <!--  ABA REGISTRO  -->
              <TabPanel value="register">
                <form @submit.prevent="handleRegister" class="flex flex-col gap-5 pt-4">
                  <!-- Nome -->
                  <div class="flex flex-col gap-1">
                    <label for="reg-name" class="text-sm font-medium text-slate-700">Nome</label>
                    <InputText
                      id="reg-name"
                      v-model="registerForm.name"
                      placeholder="Seu nome completo"
                      :invalid="registerV$.name.$error"
                      @blur="registerV$.name.$touch()"
                      class="w-full"
                    />
                    <small v-if="registerV$.name.$error" class="text-red-500 text-xs">
                      {{ registerV$.name.$errors[0]?.$message }}
                    </small>
                  </div>

                  <!-- Email -->
                  <div class="flex flex-col gap-1">
                    <label for="reg-email" class="text-sm font-medium text-slate-700">E-mail</label>
                    <InputText
                      id="reg-email"
                      v-model="registerForm.email"
                      placeholder="seu@email.com"
                      :invalid="registerV$.email.$error"
                      @blur="registerV$.email.$touch()"
                      class="w-full"
                    />
                    <small v-if="registerV$.email.$error" class="text-red-500 text-xs">
                      {{ registerV$.email.$errors[0]?.$message }}
                    </small>
                  </div>

                  <!-- Senha -->
                  <div class="flex flex-col gap-1">
                    <label for="reg-password" class="text-sm font-medium text-slate-700">Senha</label>
                    <Password
                      id="reg-password"
                      v-model="registerForm.password"
                      toggleMask
                      :invalid="registerV$.password.$error"
                      @blur="registerV$.password.$touch()"
                      inputClass="w-full"
                      class="w-full"
                    />
                    <small v-if="registerV$.password.$error" class="text-red-500 text-xs">
                      {{ registerV$.password.$errors[0]?.$message }}
                    </small>
                  </div>

                  <!-- Confirmar Senha -->
                  <div class="flex flex-col gap-1">
                    <label for="reg-confirm" class="text-sm font-medium text-slate-700">Confirmar Senha</label>
                    <Password
                      id="reg-confirm"
                      v-model="registerForm.confirmPassword"
                      :feedback="false"
                      toggleMask
                      :invalid="registerV$.confirmPassword.$error"
                      @blur="registerV$.confirmPassword.$touch()"
                      inputClass="w-full"
                      class="w-full"
                    />
                    <small v-if="registerV$.confirmPassword.$error" class="text-red-500 text-xs">
                      {{ registerV$.confirmPassword.$errors[0]?.$message }}
                    </small>
                  </div>

                  <Button
                    type="submit"
                    label="Criar Conta"
                    icon="pi pi-user-plus"
                    severity="success"
                    :loading="registerLoading"
                    :disabled="registerV$.$invalid"
                    class="w-full mt-2"
                  />
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </template>
      </Card>

      <!-- Link voltar -->
      <div class="text-center mt-6">
        <RouterLink to="/" class="text-sm text-indigo-600 hover:text-indigo-800 transition">
          <i class="pi pi-arrow-left mr-1"></i> Voltar para a Vitrine
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const toast = useToast()

const activeTab = ref('login')


// LOGIN

const loginForm = reactive({
  email: '',
  password: '',
})

const loginRules = {
  email: {
    required: helpers.withMessage('E-mail é obrigatório', required),
    email: helpers.withMessage('E-mail inválido', email),
  },
  password: {
    required: helpers.withMessage('Senha é obrigatória', required),
  },
}

const loginV$ = useVuelidate(loginRules, loginForm)
const loginLoading = ref(false)

const handleLogin = async () => {
  const isValid = await loginV$.value.$validate()
  if (!isValid) return

  loginLoading.value = true
  const result = await auth.login(loginForm.email, loginForm.password)
  loginLoading.value = false

  if (result.success) {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: result.message, life: 3000 })
    // Redireciona para a rota de origem ou Home
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } else {
    toast.add({ severity: 'error', summary: 'Erro', detail: result.message, life: 4000 })
  }
}

// REGISTRO

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const registerRules = {
  name: {
    required: helpers.withMessage('Nome é obrigatório', required),
  },
  email: {
    required: helpers.withMessage('E-mail é obrigatório', required),
    email: helpers.withMessage('Formato de e-mail inválido', email),
  },
  password: {
    required: helpers.withMessage('Senha é obrigatória', required),
    minLength: helpers.withMessage('A senha deve ter no mínimo 6 caracteres', minLength(6)),
  },
  confirmPassword: {
    required: helpers.withMessage('Confirmação de senha é obrigatória', required),
    sameAs: helpers.withMessage('As senhas não coincidem', sameAs(computed(() => registerForm.password))),
  },
}

const registerV$ = useVuelidate(registerRules, registerForm)
const registerLoading = ref(false)

const handleRegister = async () => {
  const isValid = await registerV$.value.$validate()
  if (!isValid) return

  registerLoading.value = true
  const result = await auth.register(registerForm.name, registerForm.email, registerForm.password)
  registerLoading.value = false

  if (result.success) {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: result.message, life: 3000 })
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } else {
    toast.add({ severity: 'error', summary: 'Erro', detail: result.message, life: 4000 })
  }
}
</script>
