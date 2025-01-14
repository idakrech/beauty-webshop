/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom"
import { productTypes } from "../../constants/productTypes"
import { formatParamName } from "../../utils/formatParamNames"

const CategoryList = () => {
  const types = productTypes

  // STYLE: wrap categories into columns instead of one long list
  return (
    <ul className="p-5 text-left">
    {types.map((type, index) => (
      <li key={index} className="hover:bg-gray-200 py-2">
        <Link to={`/category-page?type=${type.name}`}>
          <strong>{formatParamName(type.name)}</strong>
        </Link>
        <ul className="ml-2 text-left">
          <li><Link to={`/category-page?type=${type.name}`}>All</Link></li>
          {type.categories?.map((cat, i) => (
            <li key={i} className="py-1">
              <Link to={`/category-page?type=${type.name}&category=${cat}`}>
                {formatParamName(cat)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
  )
}

export default CategoryList
