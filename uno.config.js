// uno.config.js
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify()  // 确保 Attributify 预设被正确启用
	],
	shortcuts: {
		'flex-center': 'flex flex-justify-center flex-items-center',
	},
})