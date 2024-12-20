<template>
	<el-dialog
		v-model="innerDialogVisible"
		title="決定方位"
		width="400"
		@close="handleClose"
		:close-on-click-modal="false"
	>
		<div class="flex justify-around mb-2">
			<span v-for="item in position" :key="item">
				{{ item }}
			</span>
		</div>
		<draggable v-model="nameList" group="list" item-key="name" class="flex justify-around">
			<template #item="{ element }">
				<div class="cursor-grab">{{ element.name }}</div>
			</template>
		</draggable>
		<h3 class="mt-4 text-3">圈數:</h3>
		<el-radio-group v-model="gameType">
			<el-radio value="1" size="large">東南西北</el-radio>
			<el-radio value="2" size="large">中發白</el-radio>
		</el-radio-group>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="handleClose">Cancel</el-button>
				<el-button type="primary" @click="handleConfirm"> Confirm </el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref, reactive, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useInfoStore } from '@/store/info.js'

const props = defineProps({
	innerDialogVisible: {
		type: Boolean,
		default: false,
	},
	nameList: {
		type: Array,
		default: [],
	}
})
const infoStore = useInfoStore()
const nameList = ref(null)
const position = ref(['東', '南', '西', '北'])
const innerDialogVisible = ref(false) //props不能直接綁定v-model，要複製一份到local
const gameType = ref("1")
watch(() => props.innerDialogVisible, (val) => {
	innerDialogVisible.value = val
	if (val) nameList.value = cloneDeep(props.nameList)
})

const emit = defineEmits(['update:innerDialogVisible', 'closeDialog'])

const handleClose = () => {
	emit('update:innerDialogVisible', false)
}

const handleConfirm = () => {
	const playerInfo = []
	for (let index in nameList.value) {
		const temp = {}
		temp.name = nameList.value[index].name //名稱
		temp.position = position.value[index]//方位
		temp.score = 0 //分數
		temp.banker = position.value[index] === '東' ? true : false //莊家
		temp.winningSteak = 0 //連莊
		playerInfo.push(temp)
	}
	infoStore.updatePlayers(playerInfo)
	infoStore.updateOptions({ gameType: gameType.value })
	emit('update:innerDialogVisible', false)
	emit('closeDialog')
}
</script>

<style lang="scss" scoped>
</style>