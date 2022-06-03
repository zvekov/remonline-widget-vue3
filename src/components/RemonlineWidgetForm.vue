<script setup>
import {ref, reactive, watch} from "vue";

const phone = ref('')
const clientOrders = reactive([])

async function getOrders() {
  if (!clientOrders.value) {
    const apiUrl = 'https://api.remonline.app'
    const apiKey = import.meta.env.VITE_REMONLINE_API_KEY

    const validToken =
        await fetch(`${apiUrl}/token/new?api_key=${apiKey}`)
            .then((res) => res.json())
    //console.log(validToken.token)

    const clientData =
        await fetch(`${apiUrl}/order/?client_phones[]=${phone.value}&sort_dir=desc&token=${validToken.token}`)
            .then((res) => res.json())
    //console.log(clientData)

    clientOrders.value = clientData.data
    return {clientOrders}
  }
  return null
}

function phoneChange() {
  if (phone.value != 13) {
    clientOrders.value = null
  }
}

watch(phone, (watchPhone) => {
  if (watchPhone.length === 13) {
    getOrders()
  }
})

</script>
<template>
  <div>
    <div :class="$style.form">
      <div :class="$style.form__wrapper">

        <input
            v-model="phone"
            @keyup.enter="getOrders"
            @input="phoneChange"
            type="tel"
            autocomplete="tel"
            placeholder="+375"
            :class="$style.form__wrapper__input"
        />

        <button
            v-if="phone.length === 13"
            :class="$style.form__wrapper__button"
            @click="getOrders">
          <svg
              xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
            <path
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                d="M10.5 20.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m23.5 23.5-5.929-5.929"/>
          </svg>
        </button>

      </div>
    </div>

    <ul v-if="phone.length === 13 && clientOrders.value">
      <li
          v-for="item in clientOrders.value" :key="item.id"
          :style="item.status.name === 'Готов' ? 'background-color: #0080001c;': ''"
          class="bg-gray-100 text-sm mb-4 rounded-r-xl rounded-bl-xl p-4">
        <p>Заказ: № {{ item.id_label }}</p>
        <p class="font-bold">{{ item.custom_fields.f1918050 }} {{ item.custom_fields.f1918049 }}
          {{ item.custom_fields.f1918048 }}</p>
        <p>Статус: <strong>{{ item.status.name }}</strong></p>
        <p>Сумма: {{ item.price }} руб.</p>
      </li>
    </ul>

    <div v-if="clientOrders.value && clientOrders.value.length === 0"
         class="text-sm mb-4 rounded-r-xl rounded-bl-xl bg-gray-100 p-4">
      Заказов не найдено
    </div>

  </div>
</template>

<style module lang="scss">
.form {
  @apply mb-4 rounded-r-xl rounded-bl-xl bg-gray-100 p-4;

  &__wrapper {
    @apply relative flex items-center;

    &__input {
      @apply w-full rounded-r-xl rounded-bl-xl h-10 px-4;
    }

    &__button {
      @apply absolute right-0 mx-1 rounded-xl bg-gray-100 h-8 w-8 flex items-center justify-center hover:bg-gray-200 transition-all;

      & svg {
        @apply h-4 w-4 opacity-30;
      }

      &:hover svg {
        @apply opacity-50;
      }
    }
  }
}
</style>
