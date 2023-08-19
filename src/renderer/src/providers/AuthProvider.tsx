import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type AuthContextValue =
  | {
      changeUser: (userName: string) => void
      login: () => void
      userInfo: { [props: string]: unknown }
    }
  | undefined

const AuthContext = createContext<AuthContextValue>(undefined)

const AuthProvider = (props: Props) => {
  console.log('zhixing ')
  const [userInfo, setUserInfo] = useState({ name: 'Jack' })

  const login = useCallback(() => {}, [])
  const changeUser = useCallback((userName: string) => {
    setUserInfo({ name: userName })
  }, [])

  const contextValue = useMemo(() => {
    return { login, changeUser, userInfo }
  }, [userInfo])
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

function useAuth() {
  const contextValue = useContext(AuthContext)
  if (!contextValue) {
    throw new Error('请在AuthProvider中使用useAuth')
  }
  return contextValue
}

export { useAuth, AuthProvider }
