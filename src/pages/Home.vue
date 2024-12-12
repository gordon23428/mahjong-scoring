<template>
	<div class="h-100vh flex flex-col">
		<el-button plain @click="start"> 開始 </el-button>
		<PrepareDialog v-model:dialogVisible="dialogVisible" />

		<div class="flex-center flex-1">
			<div class="w-40% aspect-square border-2 border-solid border-sky-500 relative">
				<draggable v-model="players" item-key="name">
					<template #item="{ element }">
						<div class="cursor-grab player" @click="selectBehavior(element.name)">
							<span>{{ element.name }}</span>
							<span>({{ element.position }})</span>
							<div>{{ element.score }}</div>
						</div>
					</template>
				</draggable>
			</div>
		</div>

		<!-- <el-dialog v-model="behaviorDialogShow" title="選擇行為" width="800"> </el-dialog> -->
	</div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref, reactive, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import PrepareDialog from '@/components/PrepareDialog.vue'
import BehaviorDialog from '@/components/BehaviorDialog.vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'

const infoStore = useInfoStore()
const { players, score } = storeToRefs(infoStore)
const dialogVisible = ref(false)
const behaviorDialogShow = ref(false)
const key = ref(Math.random(100) * 100)

const gameType = 0 //東南西北: 1 ,中發白: 2

function selectBehavior(name) {
	behaviorDialogShow.value = true

}

function start() {
	dialogVisible.value = true
	++key.value
}

</script>

<style lang="scss" scoped>
.player {
	position: absolute;
	&:nth-child(1) {
		top: 0;
		left: 50%;
		transform: translateX(-50%) translateY(-120%);
	}
	&:nth-child(2) {
		top: 50%;
		left: 0;
		transform: translateX(-120%) translateY(-50%);
	}
	&:nth-child(3) {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) translateY(120%);
	}
	&:nth-child(4) {
		top: 50%;
		right: 0;
		transform: translateX(120%) translateY(-50%);
	}
}
</style>