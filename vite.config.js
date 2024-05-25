import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { execSync } from "node:child_process";

const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

function branch_grabber() {
	const virtualModuleId = "virtual:git";
	const resolvedVirtualModuleId = "\0" + virtualModuleId;
	return {
		name: "branch_grabber",
		apply: "serve",
		config() {
			return {
				define: {
					__GIT_BRANCH__: JSON.stringify(branch),
				},
			};
		},

		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				return `export const branch = "${branch}"`;
			}
		},
	};
}

export default defineConfig({
	plugins: [sveltekit(), branch_grabber()],
});
