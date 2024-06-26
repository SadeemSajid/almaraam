import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				bitter: ['Bitter', 'serif'],
				georgia: ['Georgia', 'serif'],
				arabic: ['Scheherazade New', 'serif']
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#F4F1DE',
					secondary: '#0F0F0F',
					accent: '#595CFF'
				}
			},
			{
				dark: {
					primary: '#0F0F0F',
					secondary: '#F4F1DE',
					accent: '#595CFF'
				}
			}
		]
	}
};
