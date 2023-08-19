import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import { useAuth } from './providers'
import { useQueryClient } from 'react-query'
import { memo } from 'react'

const Test = memo(() => {
  console.log('tettestst')
  return <>tttt</>
})
Test.displayName = 'Test'

const App = () => {
  console.log('进入程序')

  const queryClient = useQueryClient()
  const { userInfo } = useAuth()
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route
          path="dashboard"
          element={<>test</>}
          // 注意!: 不要在Route 的 loader 和 action 中使用上下文相关hooks : useContext以及依赖他实现的hook
          loader={async ({ params }) => {
            console.log(userInfo, params, 'params')
            if (userInfo.name === 'Jack') {
              throw new Error('无权限')
            }
            console.log(params, queryClient)
            return Promise.resolve(true)
          }}
          errorElement={<>没有权限</>}
        />
        {/* ... etc. */}
      </Route>
    )
  )
  return (
    <>
      app
      <RouterProvider router={router} />
      <Test />
    </>
  )
}

export default App
