<template>
	<div class="flex">
		<draggable :list="list1" group="list" item-key="name">
			<template #item="{ element }">
				<div>{{ element.name }}</div>
			</template>
		</draggable>
		<draggable :list="list2" group="list" item-key="name">
			<template #item="{ element }">
				<div>{{ element.name }}</div>
			</template>
		</draggable>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import draggable from 'vuedraggable'

const list1 = reactive([
	{ name: "John", id: 1 },
	{ name: "Joao", id: 2 },
	{ name: "Jean", id: 3 },
	{ name: "Gerard", id: 4 }
])
const list2 = reactive([
	{ name: "Juan", id: 5 },
	{ name: "Edgard", id: 6 },
	{ name: "Johnson", id: 7 }
])
</script>