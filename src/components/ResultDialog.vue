<template>
	<el-dialog v-model="dialogVisible" title="結束" width="500" @close="handleClose" :close-on-click-modal="false">
		<el-table :data="players" style="width: 100%">
			<el-table-column type="index" width="50" />
			<el-table-column prop="name" label="Name" width="180" />
			<el-table-column prop="score" label="Score" />
		</el-table>
		<template #footer>
			<div class="text-center">
				<el-button type="primary" @click="handleRestart"> 重新開始 </el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'
const props = defineProps({
	dialogVisible: {
		default: false,
		type: Boolean
	},
});
const dialogVisible = ref(false)
const infoStore = useInfoStore()
const { players, options, roundTracker } = storeToRefs(infoStore)

watch(() => props.dialogVisible, (val) => {
	dialogVisible.value = val
})

const emit = defineEmits(['update:dialogVisible', 'restart'])

function handleClose() {
	emit('update:dialogVisible', false)
}

function handleRestart() {
	handleClose()
	init()
	emit('restart')
}

function init() {
	players.length = 0
	options.value = {}
	roundTracker.value = '0'
}

</script>

<style lang="scss" scoped>
</style>