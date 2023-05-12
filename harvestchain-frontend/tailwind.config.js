/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      rose: "#613a3a",
      asparagus: "#60993e",
      yellowgreen: "#a1e44d",
      screamingreen: "#77ff94",
      aquamarine: "#7afdd6",
      antiwhite: "#EBEBEB",
      bistre: "#3D2424",
      hovercolor: "#49782F",
      black: "#000",
      errorred: "#DC2626",
    },
  },
  plugins: [],
};
