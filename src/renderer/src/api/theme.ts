export const getThemeByUserId = async (userId: string) => {
  console.log(userId, 'theme')

  return new Promise<{ background: string }>((resolve) => {
    setTimeout(() => {
      resolve({ background: 'lightskyblue' })
    }, 500)
  })
}
