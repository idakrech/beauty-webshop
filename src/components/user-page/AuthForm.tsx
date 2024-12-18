/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import {
  loginWithEmail,
  logOut,
  registerWithEmail,
} from "../../services/authService"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../redux"
import { setProducts as setCartProducts } from "../../redux/cartSlice"
import { setProducts as setFavProducts} from "../../redux/favoritesSlice"
import { checkPasswordStrength } from "../../helpers/passwordCheck"

const AuthForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null)
  const user = useSelector((state: AppState) => state.auth.user)
  const userFirstName = useSelector(
    (state: AppState) => state.auth.user?.displayName
  )
  const dispatch = useDispatch<AppDispatch>()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setPassword(password)
    if (isRegister) {
      const score = checkPasswordStrength(password)
      setPasswordStrength(score)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await registerWithEmail(email, password)
        console.log("User registered")
      } else {
        await loginWithEmail(email, password)
        console.log("User logged in")
      }
    } catch (error) {
      alert(`An error occured: ${error}`)
    }
  }

  const handleLogout = async () => {
    try {
      await logOut()
      dispatch(setFavProducts([]))
      dispatch(setCartProducts([]))
      console.log("User logged out")
    } catch (error) {
      alert(`An error occured: ${error}`)
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {isRegister && passwordStrength !== null && (
              <div>
                <p>
                  Strength:{" "}
                  {
                    ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][
                      passwordStrength
                    ]
                  }
                </p>
              </div>
            )}
            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
      )}

      {user && (
        <div>
          {userFirstName && <h3>Welcome {userFirstName}!</h3>}
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default AuthForm
