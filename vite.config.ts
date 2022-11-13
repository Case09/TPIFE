import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
				'./games',
				'./disk-drive',
			]
		}
	},
};

export default config;