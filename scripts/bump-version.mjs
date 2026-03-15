import { spawnSync } from "node:child_process"

const validKinds = new Set(["patch", "minor", "major"])
const kind = process.argv[2]

if (!kind || !validKinds.has(kind)) {
  console.error("Usage: npm run version:<patch|minor|major>")
  process.exit(1)
}

const result = spawnSync(
  "npm",
  ["version", kind, "--no-git-tag-version"],
  {
    stdio: "inherit",
    shell: true,
  },
)

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
