!<template>
	<el-button plain @click="dialogVisible = true"> 開始 </el-button>
	<el-dialog v-model="dialogVisible" title="Tips" width="500" >
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
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const playerInfo = reactive({
	player1: {
		name: ''
	},
	player2: {
		name: ''
	},
	player3: {
		name: ''
	},
	player4: {
		name: ''
	}
})
const scoreInfo = ref({
	base: 50,
	tai: 20
})



const handleConfirm = () => {
	
}
</script>

<style lang="scss" scoped>
</style>