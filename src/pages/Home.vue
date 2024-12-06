<template>
	<div class="w-100vw h-100vh flex flex-col">
		<el-button plain @click="dialogVisible = true"> 開始 </el-button>
		<Prepare v-model:dialogVisible="dialogVisible" />

		<div class="flex-center flex-1">
			<div class="w-40vw aspect-square border-2 border-solid border-sky-500 relative">
				<draggable v-model="players" item-key="name">
					<template #item="{ element }">
						<div class="cursor-grab player">
							<span>{{ element.name }}</span>
							<span>({{ element.position }})</span>
							<div>{{ element.score }}</div>
						</div>
					</template>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref, reactive, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import Prepare from '@/components/Prepare.vue'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'

const infoStore = useInfoStore()
const { players, score } = storeToRefs(infoStore)
const dialogVisible = ref(false)


</script>

<style lang="scss" scoped>
// .player {
// 	position: absolute;
// 	&:nth-child(1) {
// 		top: 0;
// 		left: 50%;
// 		transform: translateX(-50%) translateY(-120%);
// 	}
// 	&:nth-child(2) {
// 		top: 50%;
// 		left: 0;
// 		transform: translateX(-120%) translateY(-50%);
// 	}
// 	&:nth-child(3) {
// 		bottom: 0;
// 		left: 50%;
// 		transform: translateX(-50%) translateY(120%);
// 	}
// 	&:nth-child(4) {
// 		top: 50%;
// 		right: 0;
// 		transform: translateX(120%) translateY(-50%);
// 	}
// }
</style>