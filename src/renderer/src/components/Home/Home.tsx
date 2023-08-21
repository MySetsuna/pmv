import { UserInfo, useAuth } from '@renderer/providers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Home.less'

const postUserInfo = async () => {
  return await new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

const Home = () => {
  const { changeUser, userInfo } = useAuth()
  const [toChangUserName, setToChangUserName] = useState(userInfo.name ?? '')
  const [toChangeUserDashboard, setToChangeDashboard] = useState(
    userInfo.dashboard?.join(',') ?? ''
  )
  const queryClient = useQueryClient()
  // 修改
  const mutation = useMutation<boolean, Error, number[]>({
    mutationFn: postUserInfo,
    onSuccess: (_data, variables) => {
      // 错误处理和刷新
      // 从后台获取
      // queryClient.invalidateQueries(['useInfo', userInfo.name])
      // 前端直接改
      queryClient.setQueryData<UserInfo>(['useInfo', userInfo.name], (preUserInfo) => {
        console.log(preUserInfo, variables)
        return Object.assign({}, preUserInfo, { dashboard: variables })
      })
    }
  })

  useEffect(() => {
    setToChangUserName(userInfo.name ?? '')
    setToChangeDashboard(userInfo.dashboard?.join(',') ?? '')
  }, [userInfo])

  const navLinkClass = useCallback(
    ({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : ''),
    []
  )

  return (
    <div>
      首页 用户:{userInfo?.name}
      <div>
        <NavLink className={navLinkClass} to="/dashboard/1">
          dashboard1
        </NavLink>
        <br />
        <NavLink className={navLinkClass} to="/dashboard/2">
          dashboard2
        </NavLink>
        <br />
        <NavLink className={navLinkClass} to="/">
          返回
        </NavLink>
      </div>
      <div>
        变更用户 :
        <input
          placeholder="用户Id..."
          value={toChangUserName}
          onChange={(e) => setToChangUserName(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && toChangUserName) {
              changeUser(toChangUserName)
            }
          }}
        />
        <button onClick={() => changeUser(toChangUserName ?? '')}>确认</button>
      </div>
      <div>
        变更权限 :
        <input
          placeholder="权限Id,用','隔开"
          value={toChangeUserDashboard}
          onChange={(e) => setToChangeDashboard(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              mutation.mutate(
                toChangeUserDashboard
                  .split(',')
                  .filter((item) => item)
                  .map(Number) ?? []
              )
            }
          }}
        />
        <button
          onClick={() =>
            mutation.mutate(
              toChangeUserDashboard
                .split(',')
                .filter((item) => item)
                .map(Number) ?? []
            )
          }
        >
          确认
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(Home)
