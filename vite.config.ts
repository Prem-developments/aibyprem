// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";

function ignoreWranglerConfigInBuild(): Plugin {
	let outDirsAbs: string[] = [];

	return {
		name: "ignore-wrangler-config-in-build",
		apply: "build",
		configResolved(config) {
			const outDirs = new Set<string>();

			// Vite 7 multi-environment build (client + ssr)
			const anyConfig = config as unknown as {
				environments?: Record<string, { build?: { outDir?: string } }>;
			};
			if (anyConfig.environments) {
				for (const env of Object.values(anyConfig.environments)) {
					const envOutDir = env?.build?.outDir;
					if (typeof envOutDir === "string" && envOutDir.length > 0) {
						outDirs.add(path.resolve(config.root, envOutDir));
					}
				}
			}

			// Fallback (single-environment build)
			outDirs.add(path.resolve(config.root, config.build.outDir));

			outDirsAbs = Array.from(outDirs);
		},
		async closeBundle() {
			const filesToRemove = ["wrangler.json", "wrangler.jsonc"];
			await Promise.all(
				outDirsAbs
					.filter((outDirAbs) => path.basename(outDirAbs) === "client")
					.flatMap((outDirAbs) =>
					filesToRemove.map(async (fileName) => {
						const target = path.join(outDirAbs, fileName);
						if (!existsSync(target)) return;
						await rm(target, { force: true });
					})
				)
			);
		}
	};
}

export default defineConfig({
	vite: {
		build: {
			assetsInlineLimit: 0
		},
		plugins: [ignoreWranglerConfigInBuild()]
	}
});
