import { useParams } from 'react-router-dom'
import UserMenu from '../components/navigation/UserMenu'
import OrderHistory from '../components/user-page/OrderHistory'
import { useSelector } from 'react-redux'
import { AppState } from '../redux'
import AddressForm from '../components/user-page/AddressForm'
import AuthForm from '../components/user-page/AuthForm'
import ProductGrid from '../components/product-display/ProductGrid'

const UserPage = () => {

  const { tab } = useParams<{ tab: string }>()
  const favorites = useSelector((state: AppState) => state.favorites.products)

  return (
    <div>
    <UserMenu />
    {tab === "account-details" && <AddressForm />}
    {tab === "order-history" && <OrderHistory />}
    {tab === "log-out" && <AuthForm />}
    {tab === "favorites" && <ProductGrid products={favorites} isExpanded={false}/>}
    </div>
  )
}

export default UserPage