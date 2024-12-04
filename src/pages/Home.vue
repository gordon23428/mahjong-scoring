<template>
	<div class="w-100vw h-100vh flex flex-col">
		<el-button plain @click="dialogVisible = true"> 開始 </el-button>
		<el-dialog v-model="dialogVisible" title="Tips" width="500">
			<p class="mb-5 text-19px">輸入四位參賽者姓名</p>
			<el-input class="my-3" v-model="playerInfo.player1.name" style="width: 240px" placeholder="Please input" />
			<el-input class="my-3" v-model="playerInfo.player2.name" style="width: 240px" placeholder="Please input" />
			<el-input class="my-3" v-model="playerInfo.player3.name" style="width: 240px" placeholder="Please input" />
			<el-input class="my-3" v-model="playerInfo.player4.name" style="width: 240px" placeholder="Please input" />
			<div>
				<span>底:</span>
				<el-input class="my-3" v-model="scoreInfo.base" style="width: 50px" placeholder="Please input" />
				<span>台:</span>
				<el-input class="my-3" v-model="scoreInfo.tai" style="width: 50px" placeholder="Please input" />
			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="handleConfirm"> Confirm </el-button>
				</div>
			</template>
		</el-dialog>

		<div class="flex-center flex-1">
			<div class="h-30vh aspect-square border-2 border-solid border-sky-500 relative">
				<div class="absolute -top-10 left-50% -translate-x-50%" draggable="true" @dragstart="dragStart('0')" @dragover.prevent @drop="drop('0')">
					{{ playerInfo[positionInfo[0]].name }}
				</div>
				<div class="absolute top-50% left-0 -translate-y-50% -translate-x-120%" draggable="true" @dragstart="dragStart('1')" @dragover.prevent @drop="drop('1')">
					{{ playerInfo[positionInfo[1]].name }}
				</div>
				<div class="absolute -bottom-10 left-50% -translate-x-50%" draggable="true" @dragstart="dragStart('2')" @dragover.prevent @drop="drop('2')">
					{{ playerInfo[positionInfo[2]].name }}
				</div>
				<div class="absolute top-50% right-0 -translate-y-50% translate-x-120%" draggable="true" @dragstart="dragStart('3')" @dragover.prevent @drop="drop('3')">
					{{ playerInfo[positionInfo[3]].name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'

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
const positionInfo = ref(['player1','player2', 'player3', 'player4'])

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
		for(let i =0; i < 4; i++) {
			let positionIndex = Number(draggedPlayerKey) + i >= 4 ? Number(draggedPlayerKey) + i -4 : Number(draggedPlayerKey) + i
			let tempIndex = Number(targetPlayerKey) + i >= 4 ? Number(targetPlayerKey) + i - 4: Number(targetPlayerKey) + i
			temp[tempIndex] = positionInfo.value[positionIndex]
		}
		positionInfo.value = temp

	}
	draggedPlayerKey = null
}

const handleConfirm = () => {
	for (let index in playerInfo) {
		if (!playerInfo[index].name) return ElMessageBox.alert('請輸入四位玩家姓名!')
	}
	startGame.value = true
	dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
</style>