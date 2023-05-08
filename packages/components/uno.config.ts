import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'

const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'pink']

const UnocssPluginConfig = () =>
  Unocss({
    theme: {},
    shortcuts: {
      // 这里可以放全局公共样式
    },
    safelist: [...colors.map((color) => `bg-${color}-500`), ...colors.map((color) => `hover:bg-${color}-700`)],
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
      }),
      presetTypography()
    ]
  })

export default UnocssPluginConfig
