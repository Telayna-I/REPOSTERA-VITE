const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT({
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		"./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			xs: "370px",
			// 	sm: "480px",
			// 	md: "768px",
			// 	lg: "976px",
			// xl: "1450px",
		},
		container: {
			center: true,
		},
		extend: {
			colors: {
				"white-form": "#eefbff",
				"color-button": "#6366f1",
				"verde-wsp": "#25D366",
			},
		},
	},
	plugins: [],
});
