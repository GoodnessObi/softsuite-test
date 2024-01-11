import { createSlice } from '@reduxjs/toolkit';

type baseState = {
	routes: {
		name: string;
		link: string;
	}[];
};

const initialState: baseState = {
	routes: [
		{ name: 'Project Management', link: '' },
		{ name: 'Element Setup', link: '' },
		{ name: 'Elements', link: '/' },
	],
};

const baseSlice = createSlice({
	name: 'elementLinks',
	initialState,
	reducers: {
		addPage: (state) => {
			console.log(state);
			// state.routes.push({);
		},
		removePage: (state) => {
			state.routes.splice(1);
		},
	},
});

export const { addPage, removePage } = baseSlice.actions;
export default baseSlice.reducer;
