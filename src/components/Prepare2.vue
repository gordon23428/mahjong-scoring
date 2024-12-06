!<template>
	<el-dialog v-model="props.innerDialogVisible" title="決定方位" width="400">
		<div class="flex justify-around mb-2">
			<span v-for="item in position" :key="item">
				{{ item }}
			</span>
		</div>
		<div class="">
			<draggable v-model="nameList" group="list" item-key="name" class="flex justify-around">
				<template #item="{ element }">
					<div class="cursor-grab">{{ element.name }}</div>
				</template>
			</draggable>
		</div>
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
watch(() => props.innerDialogVisible, (val) => {
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
		temp.name = nameList.value[index].name
		temp.position = position.value[index]
		temp.score = 0
		playerInfo.push(temp)
	}
	infoStore.updatePlayers(playerInfo)
	emit('update:innerDialogVisible', false)
	emit('closeDialog')
}
</script>

<style lang="scss" scoped>
</style>