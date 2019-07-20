const svelte = require('rollup-plugin-svelte')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const postcss = require('rollup-plugin-postcss')
const sass = require('rollup-plugin-sass')
const livereload = require('rollup-plugin-livereload')
const notify = require('rollup-plugin-notify')
const includePaths = require('rollup-plugin-includepaths')

const production = !process.env.ROLLUP_WATCH

module.exports = [
  {
    input: './src/main.js',
    output: {
      name: 'app',
      format: 'esm',
      sourcemap: true,
      dir: 'public/bundle'
    },
    plugins: [
      includePaths({ paths: ['./src/'] }),
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        // we'll extract any component CSS out into
        // a separate file — better for performance
        css: css => {
          css.write('public/bundle/bundle.css')
        }
      }),
      postcss({
        extensions: ['.css']
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === 'svelte' || importee.startsWith('svelte/')
      }),
      commonjs(),
      // !production && serve({
      //   contentBase: 'public',
      //   historyApiFallback: true,
      //   port: 5050
      // }),
      !production &&
        livereload({
          watch: 'public'
        }),
      notify(),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser()
    ],

    watch: {
      clearScreen: false
    }
  },
  {
    input: 'src/main.scss',
    output: {
      format: 'esm',
      dir: 'public'
    },
    plugins: sass({
      output: 'public/main.css'
    })
  }
]
