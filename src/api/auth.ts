import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API
    }),
    endpoints: (builder) => ({
        signin: builder.mutation<{ accessToken: string, user: {} }, { email: string, password: string }>({
            query: (credentials) => ({
                url: `/signin`,
                method: "POST",
                body: credentials
            })
        }),
        signup: builder.mutation<{ accessToken: string, user: {} }, { email: string, password: string }>({
            query: (credentials) => ({
                url: `/signup`,
                method: "POST",
                body: credentials
            })
        })
    })
});

export const {
    useSigninMutation,
    useSignupMutation
} = authApi;

export const authReducer = authApi.reducer;

export default authApi