!<template>
	<el-dialog v-model="props.dialogVisible" title="輸入名稱" width="500">
		<p class="mb-5 text-19px">輸入四位參賽者姓名</p>
		<el-input
			class="my-3"
			v-model="inputInfo[0].name"
			style="width: 240px"
			placeholder="Please input"
			clearable
			maxlength="15"
		/>
		<el-input
			class="my-3"
			v-model="inputInfo[1].name"
			style="width: 240px"
			placeholder="Please input"
			clearable
			maxlength="15"
		/>
		<el-input
			class="my-3"
			v-model="inputInfo[2].name"
			style="width: 240px"
			placeholder="Please input"
			clearable
			maxlength="15"
		/>
		<el-input
			class="my-3"
			v-model="inputInfo[3].name"
			style="width: 240px"
			placeholder="Please input"
			clearable
			maxlength="15"
		/>
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
		<Prepare2 v-model:innerDialogVisible="innerDialogVisible" :nameList="inputInfo" @closeDialog="closeDialog" />
	</el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue"
import Prepare2 from "@/components/Prepare2.vue";
import { useInfoStore } from '@/store/info.js'

const props = defineProps({
	dialogVisible: {
		default: false,
		type: Boolean
	}
});
const infoStore = useInfoStore()
const innerDialogVisible = ref(false)
const emit = defineEmits(['update:dialogVisible'])

const inputInfo = ref([
	{ name: 'player1' }, { name: 'player2' }, { name: 'player3' }, { name: 'player4' }
])

const scoreInfo = ref({
	base: 50,
	tai: 20
})

const handleConfirm = () => {
	for (let name of inputInfo.value) {
		if (!name) return ElMessageBox.alert('請輸入四位玩家姓名!')
	}
	if (!isNaN(scoreInfo.base) || !isNaN(scoreInfo.tai)) return ElMessageBox.alert('底或台不能為空!')
	infoStore.updateScore(scoreInfo.value)
	innerDialogVisible.value = true
}
const closeDialog = () => {
	emit('update:dialogVisible', false)
}

</script>

<style lang="scss" scoped>
</style>