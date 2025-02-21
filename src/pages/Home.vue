<template>
	<div class="h-100vh flex flex-col relative">
		<!-- <el-button plain @click="start"> 開始 </el-button> -->
		<div class="mt-20px flex justify-between">
			<Control @start="start" />
			<Info />
		</div>
		<PrepareDialog v-model:dialogVisible="dialogVisible" />

		<div class="flex-center flex-1">
			<div class="w-40% aspect-square border-2 border-solid border-sky-500 relative">
				<div
					v-for="player in players"
					:key="player.name"
					class="cursor-grab player"
					:class="{ 'text-[#a33232]': player.banker }"
					@click="selectBehavior(player.name)"
				>
					<span>{{ player.name }}</span>
					<span>({{ player.position }})</span>
					<div>
						<span>{{ player.score }}分</span
						><span v-if="player.winningSteak" class="ml-3px">(連{{ player.winningSteak }})</span>
					</div>
				</div>
			</div>
		</div>
		<BehaviorDialog v-model:dialogVisible="behaviorDialogShow" :selectPlayer="selectPlayer" />
		<ResultDialog v-model:dialogVisible="resultDialogShow" @restart="handleRestart" />
	</div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import PrepareDialog from '@/components/PrepareDialog.vue'
import BehaviorDialog from '@/components/BehaviorDialog.vue'
import ResultDialog from '@/components/ResultDialog.vue'
import Info from '@/components/Info.vue'
import Control from '@/components/Control.vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'

const infoStore = useInfoStore()
const { players, roundTracker, options } = storeToRefs(infoStore)
const dialogVisible = ref(false)
const behaviorDialogShow = ref(false)
const resultDialogShow = ref(false)
const selectPlayer = ref('')

function selectBehavior(name) {
	behaviorDialogShow.value = true
	selectPlayer.value = name
}

function start() {
	dialogVisible.value = true
}

watch(roundTracker, (val) => {
	//代表已經結束
	if (options.value.gameType === '1') {
		if (val === '40') {
			resultDialogShow.value = true
		}
	} else if (options.value.gameType === '2') {
		if (val === '30') {
			resultDialogShow.value = true
		}
	}
})

function handleRestart() {
	start()
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
