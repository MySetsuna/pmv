import {
  createHashRouter,
  createRoutesFromElements,
  NavLink,
  Route,
  RouterProvider,
  useRouteError
} from 'react-router-dom'
import Home from './components/Home/Home'
import { useAuth } from './providers'
import Dashboard from './components/Dashboard'

const ErrorBoundary = () => {
  const error = useRouteError() as Error
  return <>{error.message}</>
}

const App = () => {
  console.log('进入程序')

  // 在这里使用context里的数据
  const { userInfo, isLoading } = useAuth()
  const router = createHashRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Home />}
        errorElement={
          <>
            没有权限<NavLink to="/">返回首页</NavLink>
          </>
        }
      >
        <Route
          path="/dashboard/:id"
          element={<Dashboard />}
          // 注意!: 不要在Route 的 loader 和 action 中使用上下文相关hooks : useContext以及依赖他实现的hook
          loader={({ params }) => {
            if (
              userInfo.dashboard instanceof Array &&
              userInfo.dashboard.includes(Number(params.id))
            ) {
              return Promise.resolve(userInfo)
            }
            throw new Error('无权限')
          }}
          errorElement={isLoading ? <>Loading...</> : <ErrorBoundary />}
        />
        {/* ... etc. */}
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
