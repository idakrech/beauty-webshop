import { useLocation } from "react-router-dom"
import { useFilterProducts } from "../hooks/useFilterProducts"
import ProductGrid from "../components/product-display/ProductGrid"
import { IFilterState } from "../redux/filterSlice"

const PromotedProductsPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const filters: IFilterState = {
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    selectedBrands: searchParams.getAll("brand"),
    selectedTags: searchParams.getAll("tag"),
    selectedColors: searchParams.getAll("color"),
    priceRange: {
      min: parseFloat(searchParams.get("price_min") || "0"),
      max: parseFloat(searchParams.get("price_max") || "Infinity"),
    },
  }

  const title = searchParams.get("title") || "Products"

  const { filteredProducts } = useFilterProducts(filters)

  return (
    <div>
      <ProductGrid products={filteredProducts} isExpanded={true} title={title} />
    </div>
  )
}

export default PromotedProductsPage
