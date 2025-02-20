<template>
	<el-dialog v-model="dialogVisible" title="輸入名稱" @close="closeDialog" :close-on-click-modal="false" class="w-80vw max-w-500px">
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
			<el-input class="my-3" v-model.number="scoreInfo.baseScore" type="number" clearable style="width: 100px" />
			<span>台:</span>
			<el-input class="my-3" v-model.number="scoreInfo.taiScore" type="number" clearable style="width: 100px" />
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="closeDialog">Cancel</el-button>
				<el-button type="primary" @click="handleConfirm"> Confirm </el-button>
			</div>
		</template>
		<PrepareDialog2 v-model:innerDialogVisible="innerDialogVisible" :nameList="inputInfo" @closeDialog="closeDialog" />
	</el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue"
import PrepareDialog2 from "@/components/PrepareDialog2.vue";
import { useInfoStore } from '@/store/info.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
	dialogVisible: {
		default: false,
		type: Boolean
	}
});
const infoStore = useInfoStore()
const dialogVisible = ref(false)//props不能直接綁定v-model，要複製一份到local
const innerDialogVisible = ref(false)
const emit = defineEmits(['update:dialogVisible'])

watch(() => props.dialogVisible, (val) => {
	dialogVisible.value = val
})

const inputInfo = ref([
	{ name: 'player1' }, { name: 'player2' }, { name: 'player3' }, { name: 'player4' }
])

const scoreInfo = ref({
	baseScore: 50,
	taiScore: 20
})

const handleConfirm = () => {
	for (let item of inputInfo.value) {
		if (!item.name) {
			return ElMessage.error('請輸入四位玩家姓名!')
		}
	}
	if (!isNaN(scoreInfo.baseScore) || !isNaN(scoreInfo.taiScore)) {
		return ElMessage.error('底或台不能為空!')
	}
	infoStore.updateOptions(scoreInfo.value)
	innerDialogVisible.value = true
}
const closeDialog = () => {
	emit('update:dialogVisible', false)
}

</script>

<style lang="scss" scoped>
</style>