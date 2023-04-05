import React, { useEffect, useState } from "react";
import { FullMenu } from "../Interfaces/Interfaces";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcMinus } from "react-icons/fc";
import { MdPlaylistAdd } from "react-icons/md";
function PopUp({
  menuName,
  id,
  handleIsPopup,
}: {
  menuName: string;
  id: number;
  handleIsPopup: () => void;
}) {
  const [fullMenu, setFullMenu] = useState<FullMenu>();
  const getFullMenuData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/${id}/${menuName}/full`
      );
      const fullMenuData = await response.json();
      setFullMenu(fullMenuData);
    } catch (e) {
      console.error(`An error occurred: ${e}`);
    }
  };

  useEffect(() => {
    getFullMenuData();
  }, []);

  return (
    <>
      
        <div className="fixed flex w-screen h-screen top-0 left-0 bg-black bg-opacity-40 ">
          <div className="relative mx-auto top-20 px-4 overflow-hidden">
            <div className="flex flex-col bg-white rounded-3xl overflow-y-scroll pb-10 h-4/5 w-auto md:w-96  ">
              <div className="flex justify-between items-center border-b-2 sticky top-0 bg-white py-3">
                <p data-testid="popup" className="pl-4 pt-2 text-lg font-bold">
                  {fullMenu?.name}
                </p>
                <button
                  className="text-3xl rotate-180 pl-2 align-middle text-center  "
                  onClick={handleIsPopup}
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>

              <div className="flex items-center justify-center align-middle ">
                {fullMenu?.largeImage ? (
                  <img
                    className="object-cover rounded-xl my-2 px-1"
                    src={fullMenu?.largeImage}
                    style={{ width: "300px", height: "300px" }}
                  />
                ) : (
                  <img src="../../assets/image.png" />
                )}
              </div>

              <h1 className=" text-2xl font-bold pl-4 border-y-2 py-1  ">
                ราคา: {fullMenu?.fullPrice} บาท{" "}
              </h1>
              {fullMenu?.options.length ?<h1 className="flex items-center gap-1 mt-4 text-xl pl-3">
                Option <MdPlaylistAdd />
              </h1>:""}
              {fullMenu && fullMenu.options.length>0
                ? fullMenu?.options.map((items) => (
                    <ul
                      key={items.label}
                      className="flex flex-col gap-1 pl-5 md:pl-16 mt-3 "
                    >
                      {items.choices
                        ? items.choices.map((item) => (
                            <li
                              className="flex items-center gap-2 text-lg"
                              key={item.label}
                            >
                              <FcMinus /> {item.label}
                            </li>
                          ))
                        : ""}
                    </ul>
                  ))
                : <p className=" flex justify-center ">No Option Avaliable</p>}
            </div>
          </div>
        </div>
      
  
    
    </>
  );
}

export default PopUp;
