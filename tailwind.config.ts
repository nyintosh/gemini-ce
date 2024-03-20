/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				'background-pan': 'background-pan 3s linear infinite',
				'fade-in': 'fade-in 1s',
			},
			colors: {
				'brand-100': '#f0f4f9',
				'brand-200': '#e6eaf1',
				'brand-300': '#585858',
				'brand-400': '#dfe4ea',
			},
			keyframes: {
				'background-pan': {
					'0%': {
						'background-position': '-800px 0px',
					},
					'100%': {
						'background-position': '800px 0px',
					},
				},
				'fade-in': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '100%',
					},
				},
			},
		},
	},
	plugins: [],
};
