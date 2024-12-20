<template>
	<div v-if="options.baseScore && options.taiScore" class="absolute top-8 right-0 p-4">
		<div>
			<span>底: {{ options.baseScore }} 台: {{ options.taiScore }}</span>
		</div>
		<span>{{ round }}</span>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'
import { ROUND_NAME } from '@/js/constant.js'

const infoStore = useInfoStore()
const { options, roundTracker } = storeToRefs(infoStore)

const round = computed(() => {
	if (roundTracker.value.length < 2) {
		return `東風${ROUND_NAME[roundTracker.value]}`
	} else {
		const temp = roundTracker.value.split('')
		return `${ROUND_NAME[temp[0]]}風${ROUND_NAME[temp[1]]}`
	}
})
</script>

<style lang="scss" scoped>
</style>