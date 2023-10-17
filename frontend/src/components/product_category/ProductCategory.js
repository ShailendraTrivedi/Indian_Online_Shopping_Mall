import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductAction } from "../../redux/slices/productSlices/productAction";
import { addCartAction } from "../../redux/slices/cartSlices/cartAction";
import Loading from "../../helper/Loading";
const ProductCategory = ({ token }) => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productStore.data);
  const loading = useSelector((state) => state.productStore.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductAction({ category }));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, [dispatch, category]);

  const handleAddToCart = (productId) => {
    dispatch(addCartAction({ productId }));
  };

  const formatPrice = (amount) => {
    if (!amount) return amount;
    return `Rs ${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="flex justify-center w-full p-10">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-3 ">
          {products && products.length > 0 ? (
            products.map((item, i) => {
              return (
                <div
                  key={i}
                  className="grid md:grid-cols-4 grid-cols-1 p-2 bg-gray-100 "
                >
                  <img
                    src={item.productImg}
                    alt=""
                    className="mx-auto h-[15rem] w-[30rem] object-contain"
                  />
                  <div className="col-span-2 p-2">
                    <div className="font-bold sm:text-base text-sm">
                      {item.productName}
                    </div>
                    <ul className="pl-10 list-disc sm:text-base text-sm">
                      {item.productList.map((ls, j) => (
                        <li key={j} className="">
                          {ls.productData}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-end gap-5">
                    <div className="flex justify-center font-bold text-2xl">
                      {formatPrice(parseInt(item.productPrice))}
                    </div>
                    <div className="flex flex-col w gap-2">
                      <button
                        className="bg-blue-700 text-white p-2 rounded"
                        onClick={() => handleAddToCart(item._id)} // Pass the entire product data
                      >
                        Add To Cart
                      </button>
                      <button className="bg-pink-700 text-white p-2 rounded">
                        Add WishList
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-2xl font-bold">No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
