import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Element } from '../types/apiResponseTypes';

export const apiService = createApi({
	reducerPath: 'apiService',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://650af6bedfd73d1fab094cf7.mockapi.io',
	}),
	tagTypes: ['elements'],
	endpoints: (builder) => ({
		getElements: builder.query<Element[], void>({
			query: () => ({ url: 'elements' }),
			transformResponse: (response: { data: { content: Element[] } }) => {
				return response.data.content;
			},
		}),
		getElement: builder.query<Element, string>({
			query: (id) => ({ url: `elements/${id}` }),
			transformResponse: (response: { data: Element }) => response.data,
		}),
		createElement: builder.mutation<Element, Partial<Element>>({
			query: (element) => ({
				url: 'elements',
				method: 'POST',
				body: element,
			}),
			invalidatesTags: ['elements'],
		}),
		updateElement: builder.mutation<Element, Element>({
			query: (element) => ({
				url: `elements/${element.id}`,
				method: 'PUT',
				body: element,
			}),
			invalidatesTags: ['elements'],
		}),
		deleteElement: builder.mutation<void, string>({
			query: (id) => ({
				url: `elements/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['elements'],
		}),

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
});

export const {
	useGetElementsQuery,
	useGetElementQuery,
	useCreateElementMutation,
	useUpdateElementMutation,
	useDeleteElementMutation,
} = apiService;
