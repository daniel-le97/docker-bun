import dts from 'bun-plugin-dts'
import consola from 'consola';

const builder = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: false,
  splitting: true,
  target: 'bun',
  plugins: [dts()]
})

builder.success ? consola.success("API bundled") : consola.error("issues building API")





