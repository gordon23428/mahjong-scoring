import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useInfoStore = defineStore('info', () => {
	const players = reactive([])
	const score = ref({})

	const updateScore = (newScore) => {
		score.value = { ...score.value, ...newScore }
	}
	const updatePlayers = (newPlayers) => {
		players.length = 0
		players.push(...newPlayers)

	}

	return { players, score, updateScore, updatePlayers }
})