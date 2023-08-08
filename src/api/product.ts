import { IProduct } from '@/interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const productApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API
    }),
    endpoints: (builder) => ({
        // actions
        // GET 
        getProducts: builder.query<IProduct[], void>({
            query: () => `/products`
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`
        }),
        addProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products`,
                method: "POST",
                body: product
            })
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product
            })
        }),
        removeProduct: builder.mutation<IProduct, number | string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation
} = productApi;

export const productReducer = productApi.reducer;

export default productApi