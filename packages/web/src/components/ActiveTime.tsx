
import { useEffect, useState } from "react";

type Time = {

        start: string ,
        end: string 
}

const isActive = (open:Date, close:Date ) :boolean => {
    const currentTime = new Date();
    const openTime = new Date(open);
    const closeTime = new Date(close);

    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
   

    if( (hour >= openTime.getHours() && minute >= openTime.getMinutes())&&(hour < closeTime.getHours())  ) {
        return true;
    }
    else return false;
};




export default function ActiveTime({start, end}:Time) {
   
        const[open, setOpen] = useState<any>();
        const[close, setClose] = useState<any>();
        const[active, setActive] = useState<boolean | undefined>(undefined);
        
        const openTime = new Date();
        openTime.setHours(parseInt(start.split(':')[0]), parseInt(start.split(':')[1]));
        const closeTime = new Date();
        closeTime.setHours(parseInt(end.split(':')[0]), parseInt(end.split(':')[1]));

    useEffect(()=>{

        setOpen(openTime);
        setClose(closeTime);
        setActive(isActive(open,close));    
        
    },[isActive(open,close)]);
    


    return (
        <>
          { active? (<div className="rounded-full bg-green-400 w-auto px-5 py-2 text-white font-medium text-center shadow-md"> Open 
          </div>) : (<div className="rounded-full bg-red-500 w-auto px-5 py-2 text-white font-medium text-center shadow-md"> Close </div>)}
        </>
    )
}