import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useInfoStore = defineStore('info', () => {
	const players = reactive([])
	const options = ref({})

	const updateOptions = (newOptions) => {
		options.value = { ...options.value, ...newOptions }
	}
	const updatePlayers = (newPlayers) => {
		players.length = 0
		players.push(...newPlayers)

	}

	return { players, options, updateOptions, updatePlayers }
})