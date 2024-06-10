/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import typography from "@tailwindcss/typography"
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["JetBrains Mono", "sans-serif"]
      }
    }
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: true,
    darkTheme: "dark"
  }
}
