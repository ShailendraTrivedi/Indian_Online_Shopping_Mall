import React from "react";
import "./helper.css";
import { Link } from "react-router-dom";
const data = [
  {
    name: "Air Condition",
    img: "/IMG/AC.avif",
    category: "accards",
  },
  {
    name: "Beauty",
    img: "/IMG/MAKEUP_BOX.avif",
    category: "beauty",
  },
  {
    name: "Fitness",
    img: "IMG/FITNESS.avif",
    category: "fitness",
  },
  {
    name: "Food",
    img: "IMG/SNACKS.avif",
    category: "food",
  },
  {
    name: "Toys",
    img: "IMG/TOYS.avif",
    category: "toy",
  },
  {
    name: "Camera",
    img: "IMG/CAMERA.avif",
    category: "cameracards",
  },
  {
    name: "Chimney",
    img: "IMG/CHIMNEY.avif",
    category: "chimneycards",
  },
  {
    name: "Mens",
    img: "IMG/MENS.avif",
    category: "mens",
  },
  {
    name: "Womens",
    img: "IMG/WOMENS.avif",
    category: "womens",
  },
  {
    name: "Kids",
    img: "IMG/KIDS.avif",
    category: "kids",
  },
  {
    name: "Watch",
    img: "IMG/WATCH.avif",
    category: "watch",
  },
  {
    name: "Refrigerator",
    img: "IMG/FRIDGE.avif",
    category: "fridgecards",
  },
  {
    name: "HeadPhones",
    img: "IMG/HEADPHONE.avif",
    category: "headphonecards",
  },
  {
    name: "Bedroom Furnitures",
    img: "IMG/BEDROOM_FURNITURE.avif",
    category: "bedroomfurniture",
  },
  {
    name: "Living Furniture",
    img: "IMG/LIVINGROOM_FURNITURE.avif",
    category: "livingfurniture",
  },
  {
    name: "Kids Furnitures",
    img: "IMG/KID_FURNITURE.avif",
    category: "kidsfurniture",
  },
  {
    name: "Home Decorations",
    img: "IMG/DECORATIVE.avif",
    category: "homedecoration",
  },
  {
    name: "CookWares",
    img: "IMG/COOKWARE.avif",
    category: "cookwareproduct",
  },
  {
    name: "Laptops",
    img: "IMG/LAPTOP.avif",
    category: "laptopcards",
  },
  {
    name: "Microwaves",
    img: "IMG/MICROWAVE.avif",
    category: "microwavecard",
  },
  {
    name: "Mobiles",
    img: "IMG/MOBILE.avif",
    category: "mobilescards",
  },
  {
    name: "PC",
    img: "IMG/PC.avif",
    category: "pccards",
  },
  {
    name: "Gaming",
    img: "IMG/GAMING_PC.avif",
    category: "gamingcards",
  },
  {
    name: "Television",
    img: "IMG/TV.avif",
    category: "televisioncards",
  },
  {
    name: "Washing Machines",
    img: "IMG/WASHING_MACHINE.avif",
    category: "washingmachinecards",
  },
];
const HomePage = () => {
  return (
    <>
      <div className="relative">
        <div className="font-serif fixed z-[-8] sm:top-48 top-28 flex flex-col xl:left-[40rem] lg:left-[25rem] md:left-[18rem] sm:left-[14rem] left-[8rem] w-fit sm:gap-10 gap-3 p-2">
          <div className="flex flex-col">
            <span className="xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-[10px]">
              Welcome To!
            </span>
            <span className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-lg text-sm font-bold">
              INDIAN ONLINE SHOPPING MALL
            </span>
          </div>
          <div className="xl:text-xl lg:text-lg md:text-base sm:text-sm text-[10px]">
            <span>Amazing Deals Await You!</span>{" "}
            <span>Discover Top-Notch Products at Unbeatable Prices!</span>
          </div>
        </div>
        <img
          src="/IMG/SHOPPING_BG3.jpg"
          alt=""
          className="fixed -z-10 top-0 sm:min-h-screen h-[40%] w-full"
        />
        <div className="sm:mt-96 mt-56 z-10 flex justify-center bg-white py-10">
          <div className="sm:w-[80%] w-[80%]">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 w-full">
              {data.map((item, i) => {
                const { name, img, category } = item;
                return (
                  <Link to={`/categories/${category}`} key={i}>
                    <div className="relative overflow-hidden bg-white group rounded hover:scale-105 transition-all duration-200 ease-in-out">
                      <div className="flex flex-col w-full h-full justify-between">
                        <div className="relative">
                          <img
                            src={img}
                            alt=""
                            className="overflow-hidden w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                        </div>
                        <div className="absolute -bottom-1 left-0 w-full h-[3rem] bg-opacity-75 rounded bg-white text-wite transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out p-2">
                          <div className="flex justify-between w-full">
                            <span className="font-bold">{name}</span>
                            <span className="text-blue-700">View All...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
