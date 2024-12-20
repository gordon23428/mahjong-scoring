import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useInfoStore = defineStore('info', () => {
	const players = reactive([])
	const options = ref({})
	const roundTracker = ref('0') //圈數進度(四進位)

	const updateOptions = (newOptions) => {
		options.value = { ...options.value, ...newOptions }
	}
	const updatePlayers = (newPlayers) => {
		players.length = 0
		players.push(...newPlayers)
	}
	const updateRoundTracker = () => {
		let decimalValue = parseInt(roundTracker.value, 4);
		decimalValue++
		roundTracker.value = decimalValue.toString(4);
	}

	return { players, options, roundTracker, updateOptions, updatePlayers, updateRoundTracker }
})