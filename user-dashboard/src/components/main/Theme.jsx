import {useEffect, useState} from "react"
import {themeChange} from "theme-change"

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset"
]

const firstLetterUppercase = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"))

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
    setTheme(localStorage.getItem("theme"))
  }, [])
  return (
    <div className="flex-col flex gap-3">
      <div className="text-lg self-center">Select Theme</div>
      <select
        value={theme}
        data-choose-theme
        className="select select-bordered text-base-content"
        onChange={e => setTheme(e.target.value)}
      >
        {themes.map((theme, index) => (
          <option key={index} value={theme}>
            {firstLetterUppercase(theme)}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Theme
