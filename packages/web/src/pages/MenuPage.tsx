import { useEffect, useState } from "react";
import ActiveTime from "../components/ActiveTime";
import { Restaurant, ShortMenu } from "../Interfaces/Interfaces";
import PopUp from "../components/PopUp";
import { MoonLoader } from "react-spinners";
import {FcCancel} from 'react-icons/fc'

function MenuPage({ id }: { id: number }) {
  const [data, setData] = useState<Restaurant>();
  const [shortMenu, setShortMenu] = useState<Array<ShortMenu>>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getRestaurantData = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/${id}`
      );
      const restaurantData = await response.json();
      setData(restaurantData);
      getShortMenuData(restaurantData.menus);
    } catch (e) {
      console.error(`An error occurred: ${e}`);
    }
  };

  const getShortMenuData = async (menus: string[] | undefined) => {
    if (!data) {
      return "";
    }
    try {
      const menuArray = data.menus.map(async (menuName) => {
        const response = await fetch(
          `http://localhost:3000/api/restaurant/${id}/${menuName}/short`
        );
        return await response.json();
      });
      const menuData = await Promise.all(menuArray);
      setShortMenu(menuData);
      setLoading(false);
    } catch (e) {
      console.error(`An error occurred: ${e}`);
    }
  };

  const handleClick = (menuName: string) => {
    if (menuName) {
      setMenuSelected(menuName);
      setIsPopup(true);
    }
  };

  function updateIsPopup() {
    setIsPopup(false);
  }

  useEffect(() => {
    getRestaurantData(id);
  }, []);

  useEffect(() => {
    if (data?.menus) {
      getShortMenuData(data?.menus);
    }
  }, [data]);

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <header>
          <img
            className="object-cover overflow-hidden"
            src={data?.coverImage}
            alt="cover Image"
          />
          <div className="flex flex-col items-start py-5 mx-5 gap-3 border-b-2 border-green-600 border-dashed mb-3 md:flex-row md:items-center  ">
            <h1 className="text-lg font-bold md:text-xl">{data?.name}</h1>
            {data ? (
              <ActiveTime
                start={data.activeTimePeriod.open}
                end={data.activeTimePeriod.close}
              />
            ) : (
              ""
            )}
          </div>
        </header>
        <main className=" mx-5">
          {shortMenu.length === data?.menus.length && !loading ? (

              <div>
                {shortMenu.map((menu: any) => (
                  <div
                    className="flex justify-start border rounded-lg mb-2 overflow-hidden hover:border-green-600 hover:scale-105 hover:shadow-md w-auto group"
                    key={menu.index}
                    onClick={() => {
                      handleClick(menu.name);
                    }}
                  >
                    {menu.thumbnailImage ? (
                      <img src={menu.thumbnailImage} />
                    ) : (
                      <img src="../../assets/icons8-no-image-100.png"></img>
                    )}
                    <div className="flex flex-col justify-evenly ml-4 my-1.5">
                      <p className="text-sm font-semibold md:text-lg font-base group-hover:font-semibold">
                        {menu.name}{" "}
                      </p>
                      <p className="text-sm md:text-lg">{menu.fullPrice} บาท {menu.sold === menu.totalInStock ? <span> <img className="inline-flex items-center ml-2" src="../../assets/sold.png" style={{width:"35px"}} /></span> :""}</p>
                
                    </div>
                  </div>
                ))}
              </div>
          
          ) : (
            <div className="flex flex-col justify-center items-center mt-10">
              <MoonLoader color="rgb(22,163, 74)" loading speedMultiplier={2} />
              <p className="mt-2">กำลังโหลดเมนู..</p>
            </div>
          )}
        </main>
      </div>

      {isPopup ? (
        <PopUp menuName={menuSelected} id={id} handleIsPopup={updateIsPopup} />
      ) : (
        ""
      )}
    </>
  );
}

export default MenuPage;
