<script setup>
import {ref} from 'vue'
import RemonlineWidgetForm from './RemonlineWidgetForm.vue'

const showWidget = ref(false)

function toggleWidget() {
  showWidget.value = !showWidget.value
}
</script>


<template>
  <div :class="$style.widget">
    <div v-if="showWidget" :class="$style.widget__backdrop" @click="toggleWidget"></div>

    <div :class="$style.widget__wrapper">

      <Transition>
        <div v-if="showWidget" :class="$style.widget__wrapper__container">
          <div :class="$style.widget__wrapper__title">
            Статус заказа
          </div>
          <RemonlineWidgetForm/>
        </div>
      </Transition>
    </div>
    <button @click="toggleWidget" :class="$style.widget__button">
      <span v-if="!showWidget" :class="$style.widget__button__show">Узнать статус заказа</span>
      <span v-if="showWidget" :class="$style.widget__button__close">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" style="stroke-width: 2px;" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m.5.499 23 23"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m23.5.499-23 23"/>
          </svg>
        </span>
    </button>
  </div>
</template>

<style module lang="scss">

.widget {

  &__backdrop {
    @apply absolute h-screen w-screen z-0;
  }

  &__wrapper {
    @apply fixed left-0 bottom-0 m-8;

    &__container {
      @apply absolute bottom-0 mb-16 rounded-xl p-4 z-10 w-80;
      max-height: calc(100vh - 8rem);
      max-width: calc(100vw - 4rem);
      box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
    }

    &__title {
      @apply mt-2 mb-4 text-xl;
    }
  }
  &__button {
    @apply rounded-full bg-blue-900 text-white cursor-pointer text-center z-10 h-12 fixed m-8 bottom-0;

    & span {
      @apply flex items-center justify-center;
    }

    &__show {
      @apply w-full px-6;

    }

    &__close {
      @apply w-12 px-0;
    }
  }
}
</style>
