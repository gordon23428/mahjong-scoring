<template>
	<div class="w-100vw h-100vh flex flex-col">
		<el-button plain @click="dialogVisible = true"> 開始 </el-button>
		<Prepare :dialogVisible="dialogVisible" @setPlayer="setPlayer" />

		<div class="flex-center flex-1">
			<div class="w-40vw aspect-square border-2 border-solid border-sky-500 relative">
				<div
					class="absolute -top-15 left-50% -translate-x-50%"
					draggable="true"
					@dragstart="dragStart('0')"
					@dragover.prevent
					@drop="drop('0')"
				>
					<span>({{ playerInfo[positionInfo[0]].position }})</span>
					<span>{{ playerInfo[positionInfo[0]].name }}</span>
					<p>分數: {{ playerInfo[positionInfo[0]].score }}</p>
				</div>
				<div
					class="absolute top-50% left-0 -translate-y-50% -translate-x-120%"
					draggable="true"
					@dragstart="dragStart('1')"
					@dragover.prevent
					@drop="drop('1')"
				>
					<span>({{ playerInfo[positionInfo[1]].position }})</span>
					<span>{{ playerInfo[positionInfo[1]].name }}</span>
					<p>分數: {{ playerInfo[positionInfo[1]].score }}</p>
				</div>
				<div
					class="absolute -bottom-15 left-50% -translate-x-50%"
					draggable="true"
					@dragstart="dragStart('2')"
					@dragover.prevent
					@drop="drop('2')"
				>
					<span>({{ playerInfo[positionInfo[2]].position }})</span>
					<span>{{ playerInfo[positionInfo[2]].name }}</span>
					<p>分數: {{ playerInfo[positionInfo[2]].score }}</p>
				</div>
				<div
					class="absolute top-50% right-0 -translate-y-50% translate-x-120%"
					draggable="true"
					@dragstart="dragStart('3')"
					@dragover.prevent
					@drop="drop('3')"
				>
					<span>({{ playerInfo[positionInfo[3]].position }})</span>
					<span>{{ playerInfo[positionInfo[3]].name }}</span>
					<p>分數: {{ playerInfo[positionInfo[3]].score }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import Prepare from '@/components/Prepare.vue'

const dialogVisible = ref(false)
const playerInfo = reactive({
	player1: {
		name: 'player1',
		score: 0,
		position: '東'
	},
	player2: {
		name: 'player2',
		score: 0,
		position: '南'
	},
	player3: {
		name: 'player3',
		score: 0,
		position: '西'
	},
	player4: {
		name: 'player4',
		score: 0,
		position: '北'
	}
})
//控制排序
const positionInfo = ref(['player1', 'player2', 'player3', 'player4'])

const scoreInfo = ref({
	base: 50,
	tai: 20
})
const startGame = ref(false)
let draggedPlayerKey = null

const dragStart = (playerKey) => {
	draggedPlayerKey = playerKey
}

const drop = (targetPlayerKey) => {
	if (draggedPlayerKey !== targetPlayerKey) {
		const temp = []
		//排序新的順序
		for (let i = 0; i < 4; i++) {
			let positionIndex = Number(draggedPlayerKey) + i >= 4 ? Number(draggedPlayerKey) + i - 4 : Number(draggedPlayerKey) + i
			let tempIndex = Number(targetPlayerKey) + i >= 4 ? Number(targetPlayerKey) + i - 4 : Number(targetPlayerKey) + i
			temp[tempIndex] = positionInfo.value[positionIndex]
		}
		positionInfo.value = temp

	}
	draggedPlayerKey = null
}

const setPlayer = () => {

}

</script>

<style lang="scss" scoped>
</style>