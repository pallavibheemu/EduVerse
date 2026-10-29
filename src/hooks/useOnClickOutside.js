import { useEffect } from "react";


//this hook works when click outside of the specified component, the component disappers or closes
export default function useOnClickOutside(ref, handler){
    useEffect(() => {
        //define the listener function to be called on click/touch events
        //This function will run every time the user clicks or touches anywhere on the page.
        const listener= (event) => {
            //if the click event occured/originated inside the ref element, do nothing and return
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            //otherwise call the provided handler function
            handler(event);
        };

        document.addEventListener("mousedown", listener); //Whenever the mouse button is pressed anywhere in the document, run listener."
         document.addEventListener("touchstart", listener);//This does basically the same thing for touchscreens.


         return ()=> {
             document.removeEventListener("mousedown", listener);
              document.removeEventListener("touchstart", listener);
         }; //When the component using this hook disappears/unmounts, React runs this cleanup function.
    },[ref,handler]); //The effect will run again if ref or handler changes.
}



//It's commonly used for dropdowns, modals, menus, popups, etc.
//ref tells us which element we are watching.
//handler is the function we want to execute when the user clicks outside.
// useOnClickOutside(ref, handler), so this indicates, watch ref, if user clicks outside ref, call handler