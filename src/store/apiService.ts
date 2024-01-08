import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	Element,
	ElementLink,
	Grade,
	Suborganization,
} from '../types/apiResponseTypes';

type ElementLinkIds = {
	id: string;
	elementId: string;
};

export const apiService = createApi({
	reducerPath: 'apiService',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://650af6bedfd73d1fab094cf7.mockapi.io',
	}),
	tagTypes: ['elements', 'elementLinks'],
	endpoints: (builder) => ({
		getElements: builder.query<Element[], void>({
			query: () => ({ url: 'elements' }),
			transformResponse: (response: { data: { content: Element[] } }) => {
				return response.data.content;
			},
			providesTags: ['elements'],
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

		//Elementlinks
		getElementLinks: builder.query<ElementLink[], string>({
			query: (path) => `elements/${path}/elementlinks`,
			transformResponse: (response: { data: { content: ElementLink[] } }) => {
				return response.data.content;
			},
			providesTags: ['elementLinks'],
		}),
		getElementLink: builder.query<ElementLink, ElementLinkIds>({
			query: (value) => `elements/${value.elementId}/elementlinks/${value.id}`,
		}),
		addElementLink: builder.mutation<ElementLink, ElementLink>({
			query: (data) => ({
				url: `elements/${data.elementId}/elementlinks`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['elementLinks'],
		}),
		updateElementLink: builder.mutation<ElementLink, ElementLink>({
			query: (data) => ({
				url: `elements/${data.elementId}/elementlinks/${data.id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['elementLinks'],
		}),
		deleteElementLink: builder.mutation<void, ElementLinkIds>({
			query: (data) => ({
				url: `elements/${data.elementId}/elementlinks/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['elementLinks'],
		}),

		getGrades: builder.query({
			query: () => 'grade',
			transformResponse: (response: { data: Grade[] }) => {
				return response.data;
			},
		}),
		getGradeSteps: builder.query({
			query: (id) => `grade/${id}/gradesteps`,
		}),
		getSuborganizations: builder.query({
			query: () => 'suborganizations',
			transformResponse: (response: { data: Suborganization }) => {
				return response.data;
			},
		}),
		getDepartments: builder.query({
			query: (id) => `suborganizations/${id}/departments`,
		}),

		// Include endpoints from lookupApi
		getLookupValues: builder.query({
			query: (id) => `lookups/${id}/lookupvalues`,
		}),
		// fetchElementClassification: builder.query({
		// 	query: () => 'lookups/2/lookupvalues',
		// }),
		// fetchPayrun: builder.query({
		// 	query: () => 'lookups/5/lookupvalues',
		// }),

		// fetchJobTitle: builder.query({
		// 	query: () => 'lookups/6/lookupvalues',
		// }),
		// fetchLocation: builder.query({
		// 	query: () => 'lookups/7/lookupvalues',
		// }),
		// fetchEmployeeType: builder.query({
		// 	query: () => 'lookups/4/lookupvalues',
		// }),
		// fetchEmployeeCategory: builder.query({
		// 	query: () => 'lookups/5/lookupvalues',
		// }),

		// fetchUnion: builder.query({
		// 	query: () => 'lookups/8/lookupvalues',
		// }),
		// fetchHousing: builder.query({
		// 	query: () => 'lookups/9/lookupvalues',
		// }),
		// fetchWardrobe: builder.query({
		// 	query: () => 'lookups/10/lookupvalues',
		// }),
		// fetchSecurity: builder.query({
		// 	query: () => 'lookups/11/lookupvalues',
		// }),
	}),
});

export const {
	useGetElementsQuery,
	useGetElementQuery,
	useCreateElementMutation,
	useUpdateElementMutation,
	useDeleteElementMutation,

	//elementlinks
	useGetElementLinksQuery,
	useGetElementLinkQuery,
	useAddElementLinkMutation,
	useUpdateElementLinkMutation,
	useDeleteElementLinkMutation,

	//grades
	useGetGradesQuery,
	useGetGradeStepsQuery,
	useGetSuborganizationsQuery,
	useGetDepartmentsQuery,

	//lookup
	useGetLookupValuesQuery,
} = apiService;
