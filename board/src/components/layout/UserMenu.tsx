import { useState, type FormEvent } from 'react'
import { useUserStore } from '../../store/useUserStore'

/** 헤더의 닉네임 로그인/로그아웃 */
function UserMenu() {
  const user = useUserStore((state) => state.user)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)
  const [nickname, setNickname] = useState('')

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    if (!nickname.trim()) return
    login(nickname)
    setNickname('')
  }

  if (user) {
    return (
      <div className="user-menu">
        <span className="avatar" aria-hidden="true">
          {user.nickname.charAt(0)}
        </span>
        <span className="user-name">{user.nickname}</span>
        <button type="button" className="chip" onClick={logout}>
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <form className="user-menu" onSubmit={handleLogin}>
      <input
        className="user-input"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
        aria-label="닉네임"
      />
      <button type="submit" className="chip">
        로그인
      </button>
    </form>
  )
}

export default UserMenu
