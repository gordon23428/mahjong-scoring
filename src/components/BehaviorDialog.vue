<template>
	<el-dialog v-model="dialogVisible" :title="`${props.selectPlayer}選擇行為`" width="500" @close="handleClose">
		<div class="mb-2">
			<el-button :class="{ act: type === 'zihmo' }" @click="type = 'zihmo'">自摸</el-button>
			<el-button :class="{ act: type === 'hu' }" @click="type = 'hu'">胡</el-button>
		</div>
		<!-- 放槍玩家 -->
		<el-select
			class="mb-2"
			v-if="type === 'hu'"
			v-model="losePlayer"
			placeholder="放槍"
			size="large"
			style="width: 6rem"
		>
			<el-option v-for="item in otherPlayer" :key="item.name" :label="item.name" :value="item.name" />
		</el-select>
		<!-- 台數 -->
		<el-select v-if="type" class="block" v-model="tai" placeholder="台數" size="large" style="width: 6rem">
			<el-option v-for="num in taiList" :key="num" :label="num" :value="num" />
		</el-select>

		<template #footer>
			<div class="text-center">
				<el-button type="primary" @click="handleConfirm"> Confirm </el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { find } from 'lodash-es'
import { useInfoStore } from '@/store/info.js'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps({
	dialogVisible: {
		default: false,
		type: Boolean
	},
	selectPlayer: {
		default: '',
		type: String
	}
});

const infoStore = useInfoStore()
const { players, options } = storeToRefs(infoStore)
const dialogVisible = ref(false)//props不能直接綁定v-model，要複製一份到local
const type = ref('')//自摸 or 胡
const losePlayer = ref('')//放槍玩家
const tai = ref('')
const taiList = ref(Array.from({ length: 50 }, (_, i) => i + 1))

const otherPlayer = computed(() =>
	players.value.filter((player) => player.name !== props.selectPlayer))

watch(() => props.dialogVisible, (val) => {
	dialogVisible.value = val
})

const emit = defineEmits(['update:dialogVisible'])

function handleClose() {
	emit('update:dialogVisible', false)
}

function handleConfirm() {
	const errMsg = validate()
	if (errMsg) return ElMessage.error(errMsg)

	const base = options.value.baseScore + options.value.taiScore * tai.value //基本輸贏分數
	let bankerIndex = null //記錄莊家index
	//自摸
	if (type.value === 'zihmo') {
		let winScore = 0 //自摸贏得分數
		players.value = players.value.map((player, index) => {
			const isWinner = player.name === props.selectPlayer
			const isBanker = player.banker
			if (!isWinner) {
				const score = player.banker ? base + options.value.taiScore * calcBankerLoseTai(player) : base
				player.score -= score
				winScore += score
			}
			if (isBanker) {
				//如果是莊家獲勝要判斷連莊
				if (isWinner) {
					player.winningSteak++
				} else { //換莊
					bankerIndex = index
					player.banker = false
				}
			}
			return player
		})
		find(players.value, { name: props.selectPlayer }).score += winScore
	} else { //胡牌
		players.value = players.value.map((player, index) => {
			const isWinner = player.name === props.selectPlayer
			const isLoser = player.name === losePlayer.value
			const isBanker = player.banker
			if (isWinner) {
				player.score += base
				//如果是莊家獲勝要判斷連莊
				if (isBanker) {
					player.winningSteak++
				}
			} else if (isLoser) {
				player.score -= base
			}
			//換莊
			if (isBanker && !isWinner) {
				bankerIndex = index
				player.banker = false
			}
			return player
		})
	}
	//換莊(bankerIndex == null 代表連莊)
	const nextBankerIndex = bankerIndex !== null ? (bankerIndex + 1 > 3 ? 0 : bankerIndex + 1) : null
	if (nextBankerIndex !== null) {
		infoStore.updateRoundTracker()
		players.value[nextBankerIndex].banker = true
	}
	init()
	handleClose()
}

//計算莊家額外輸掉台數
function calcBankerLoseTai(player) {
	if (!player.winningSteak) return 1
	else return player.winningSteak * 2
}

function init() {
	losePlayer.value = ''
	tai.value = ''
	type.value = ''
}

function validate() {
	if (!tai.value) {
		return '請選擇台數!'
	}
	if (type.value === 'hu' && !losePlayer.value) {
		return '請選擇放槍玩家!'
	}
}

</script>

<style lang="scss" scoped>
.act {
	color: #409eff;
	border-color: rgb(197.7, 225.9, 255);
	background-color: rgb(235.9, 245.3, 255);
}
</style>