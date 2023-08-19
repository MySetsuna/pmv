import { createContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type ThemeContextValue = { background: string } | undefined

const ThemeContext = createContext<ThemeContextValue>(undefined)

const ThemeProvider = (props: Props) => {
  console.log('ThemeProvider')

  return <ThemeContext.Provider value={undefined}>{props.children}</ThemeContext.Provider>
}

export default ThemeProvider
