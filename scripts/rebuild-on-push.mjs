import { spawnSync } from 'node:child_process'

const steps = [
  ['tsc', ['-b']],
  ['vite', ['build', '--outDir', 'dist']],
  ['vite', ['build', '--outDir', 'docs']],
]

for (const [command, args] of steps) {
  const executable = process.platform === 'win32' ? `${command}.cmd` : command
  const result = spawnSync(executable, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: process.platform !== 'win32',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
