import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface User {

    _id : string,
    name : string,
    profile_pic?:string

}


export const userApi = createApi({

    reducerPath : "userApi", //unique key for this API slice
    baseQuery : fetchBaseQuery({baseUrl:"/api/"}), //this calls `/api/users` when used
    endpoints :(builder)=>({
        getUsers : builder.query<User[],void>({
          query: ()=>"users"  //no params required
        })
    })
})

export const { useGetUsersQuery } = userApi;
