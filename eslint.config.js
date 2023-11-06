// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: { 'node/prefer-global/buffer': 'off', 'eslint-comments/no-unlimited-disable': 'off' },
})
