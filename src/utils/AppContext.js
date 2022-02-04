import { createContext, useState,useMemo } from "react";

const Context = createContext({
    user:'',
    loading:true,
})


const Provider = ({children}) =>{
    const [user,SetUser] = useState()
    var loading = user ? false : true

   // const value = {data,SetData}

   const value = useMemo(() => ({
    user,SetUser,loading
    }), [user, SetUser,loading])

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export {Provider,Context}