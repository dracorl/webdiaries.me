const isLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken")
  return !!accessToken // AccessToken varsa true, yoksa false döner
}

const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

const clearTokens = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export {isLoggedIn, saveTokens, clearTokens}
