<template>
	<div class="h-100vh flex flex-col">
		<el-button plain @click="start"> 開始 </el-button>
		<PrepareDialog v-model:dialogVisible="dialogVisible" />

		<div class="flex-center flex-1">
			<div class="w-40% aspect-square border-2 border-solid border-sky-500 relative">
				<div
					v-for="player in players"
					:key="player.name"
					class="cursor-grab player"
					@click="selectBehavior(player.name)"
				>
					<span>{{ player.name }}</span>
					<span>({{ player.position }})</span>
					<div>{{ player.score }}</div>
				</div>
			</div>
		</div>
		<BehaviorDialog v-model:dialogVisible="behaviorDialogShow" :selectPlayer="selectPlayer" />
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import PrepareDialog from '@/components/PrepareDialog.vue'
import BehaviorDialog from '@/components/BehaviorDialog.vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'

const infoStore = useInfoStore()
const { players } = storeToRefs(infoStore)
const dialogVisible = ref(false)
const behaviorDialogShow = ref(false)
const selectPlayer = ref('')

const gameType = 0 //東南西北: 1 ,中發白: 2

function selectBehavior(name) {
	behaviorDialogShow.value = true
	selectPlayer.value = name

}

function start() {
	dialogVisible.value = true
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