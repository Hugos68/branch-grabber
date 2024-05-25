import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { execSync } from "node:child_process";

function branch_grabber() {
	return {
		name: "branch_grabber",
		apply: "serve",
		config() {
			const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
			return {
				define: {
					__GIT_BRANCH__: JSON.stringify(branch),
				},
			};
		},
	};
}

export default defineConfig({
	plugins: [sveltekit(), branch_grabber()],
});
