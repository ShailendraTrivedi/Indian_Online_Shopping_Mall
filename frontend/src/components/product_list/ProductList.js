import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/acion/product_action";

const ProductList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.products.map((item, i) => {
              return (
                <div key={i} className="flex flex-col justify-between">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                      alt="Front of men's Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{item.price}</p>
                  </div>
                  <button className="bg-blue-700 text-white p-2 rounded">Add To Cart</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
