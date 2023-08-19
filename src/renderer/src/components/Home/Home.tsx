import { useAuth } from '@renderer/providers'
import { memo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Home = () => {
  const [toChangUserName, setToChangUserName] = useState('')
  const { changeUser } = useAuth()
  console.log('genxin')
  return (
    <div>
      首页
      <div>
        <NavLink to="/">返回</NavLink>
        <NavLink to="dashboard">dashboard</NavLink>
      </div>
      <div>
        <input value={toChangUserName} onChange={(e) => setToChangUserName(e.target.value)} />
        <button onClick={() => changeUser(toChangUserName)}>确认</button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(Home)
