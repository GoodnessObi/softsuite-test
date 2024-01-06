import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Element } from "../types/apiResponseTypes/apiResponseTypes";

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://650af6bedfd73d1fab094cf7.mockapi.io' }),
  endpoints: (builder) => ({
    getElements: builder.query<Element[], void>({
      query: () => ({ url: 'elements'}),
      transformResponse:  (response: { data: Element[] })  => response.data
    })
 
    // getPet: builder.query<Pet, string>({
    //   query: (id) => ({ url: "pets", params: { id } }),
    //   transformResponse: (response) => response.pets[0],
    // }),
    // getBreeds: builder.query<Pet[], Animal>({
    //   query: (animal) => ({ url: "breeds", params: { animal } }),
    //   transformResponse: (response) => response.breeds,
    // }),
    // search: builder.query<Pet[], searchState>({
    //   query: ({ animal, location, breed }) => ({
    //     url: "pets",
    //     params: { animal, location, breed },
    //   }),
    //   transformResponse: (response) => response.pets,
    // }),
  }),
})

export const { useGetElementsQuery } = apiService