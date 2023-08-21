import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  useEffect
} from 'react'
import { useQuery } from '@tanstack/react-query'

export type UserInfo = { [props: string]: unknown; name?: string; dashboard?: number[] }

const getUserInfo = async (userId: string) => {
  console.log('fetch user Info ', userId)
  if (userId === 'Jack') {
    return Promise.resolve({ name: userId, dashboard: [1, 2] })
  } else if (userId === 'John') {
    return Promise.resolve({ name: userId, dashboard: [2] })
  } else {
    return Promise.resolve({ name: userId, dashboard: [] })
  }
}

type Props = {
  children: ReactNode
  defaultUser?: string
}

type AuthContextValue =
  | {
      changeUser: (userName: string) => void
      login: () => void
      userInfo: UserInfo
      isLoading: boolean
      isError: boolean
    }
  | undefined

const AuthContext = createContext<AuthContextValue>(undefined)

const AuthProvider = (props: Props) => {
  // to set Defult User
  const [userId, setUserId] = useState<string>(props.defaultUser ?? 'Jack')

  useEffect(() => {
    setUserId('Jack')
  }, [])

  console.log(userId, 'userId')

  const {
    data: userInfo = {},
    isLoading,
    isError
  } = useQuery(['useInfo', userId], () => getUserInfo(userId), {
    enabled: !!userId
  })

  const login = useCallback(() => {}, [])
  const changeUser = useCallback((userName: string) => {
    setUserId(userName)
  }, [])

  const contextValue = useMemo(() => {
    return { login, changeUser, userInfo, isLoading, isError }
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
