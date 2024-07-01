/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"weather-primary": "#87CEEB",
				"weather-secondary": "#4682B4",
			},
		},
		fontFamily: {
			Playwrite: ["Playwrite DE Grund, cursive", "system-ui", "sans-serif"],
		},
		container: {
			padding: "2rem",
			center: true,
		},
		screens: {
			sm: "640px",
			md: "768px",
		},
	},
	plugins: [],
};
