<template>
  <el-button plain @click="start"> {{ text }} </el-button>
</template>

<script setup>
import { computed } from 'vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'

const infoStore = useInfoStore()
const { players } = storeToRefs(infoStore)
const isStarted = computed(() => players.value.length > 0)
const text = computed(() => isStarted.value ? '重新開始' : '開始')

const emit = defineEmits(['start'])
const start = () => {
  emit('start')
}

</script>
