/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./public/**/*.html',
		'./src/**/*.{js,jsx,ts,tsx,vue}',
		'./src/**/*.html',
	],
	theme: {
		extend: {
			colors: {
				black: "rgb(14 15 16)",
				gray: {
					"50": "#f7f8f8",
					"100": "#edeef1",
					"200": "#d8dbdf",
					"300": "#b6bac3",
					"400": "#8e95a2",
					"500": "#6b7280",
					"600": "#5b616e",
					"700": "#4a4e5a",
					"800": "#40444c",
					"900": "#383a42",
					"950": "#25272c",
				},
				background: "rgb(30 31 34 / <alpha-value>)",
				semibackground: "rgb(30 31 34 / <alpha-value>)",
				midground: "rgb(43 45 49 / <alpha-value>)",
				foreground: "rgb(49 51 56 / <alpha-value>)",
				primary: "rgb(88 101 242 / <alpha-value>)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
				"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	  },
	  darkMode: "class",
};
