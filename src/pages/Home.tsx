/* eslint-disable @typescript-eslint/no-unused-vars */
import useFetchProducts from "../hooks/useFetchProducts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { filterProducts } from "../utils/filterProducts"
import { useEffect } from "react"
import { resetProducts } from "../redux/productsSlice"

const Home = () => {
  const state = useSelector((state: AppState) => state)
  const filterParams = state.filters.map((f) => f.fetchParams)

  useFetchProducts(filterParams)
  

  return (
    <>
      {filterProducts(state)}
    </>
  )
}

export default Home
