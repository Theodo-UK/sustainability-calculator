/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'light-green': '#96E072',
                'myrtle-green': '#357266',
                'nyanza': '#E8FCCF',
                'rose-quartz': '#A89B9D',
                'raisin-black': '#2D232E',
            }
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /bg-(red|green|blue|gray)-(400|500)/,
        },
    ],
};
