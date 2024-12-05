!<template>
	<el-dialog v-model="props.dialogVisible" title="輸入名稱" width="500">
		<p class="mb-5 text-19px">輸入四位參賽者姓名</p>
		<el-input class="my-3" v-model="playerInfo.player1.name" style="width: 240px" placeholder="Please input" clearable maxlength="15" />
		<el-input class="my-3" v-model="playerInfo.player2.name" style="width: 240px" placeholder="Please input" clearable maxlength="15" />
		<el-input class="my-3" v-model="playerInfo.player3.name" style="width: 240px" placeholder="Please input" clearable maxlength="15" />
		<el-input class="my-3" v-model="playerInfo.player4.name" style="width: 240px" placeholder="Please input" clearable maxlength="15" />
		<div>
			<span>底:</span>
			<el-input class="my-3" v-model="scoreInfo.base" style="width: 50px" />
			<span>台:</span>
			<el-input class="my-3" v-model="scoreInfo.tai" style="width: 50px" />
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="handleConfirm"> Confirm </el-button>
			</div>
		</template>
		<el-dialog v-model="innerDialogVisible" title="決定方位" width="400">
			<div class="flex justify-around mb-5">
				<div>
					<span>東</span>
					<div></div>
				</div>
				<div>
					<span>南</span>
					<div></div>
				</div>
				<div>
					<span>西</span>
					<div></div>
				</div>
				<div>
					<span>北</span>
					<div></div>
				</div>
			</div>
			<div class="flex justify-around">
				<div v-for="(item, index) in playerInfo" :key="index">
					{{ item.name }}
				</div>
			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="handleConfirm"> Confirm </el-button>
				</div>
			</template>
		</el-dialog>
	</el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue"
const props = defineProps({
	dialogVisible: {
		default: false,
		type: Boolean
	}
});

const innerDialogVisible = ref(false)

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

const scoreInfo = ref({
	base: 50,
	tai: 20
})

const handleConfirm = () => {
	for (let index in playerInfo) {
		if (!playerInfo[index].name) return ElMessageBox.alert('請輸入四位玩家姓名!')
	}
	if (!isNaN(scoreInfo.base) || !isNaN(scoreInfo.tai)) return ElMessageBox.alert('底或台不能為空!')
	innerDialogVisible.value = true
}
</script>

<style lang="scss" scoped>
</style>