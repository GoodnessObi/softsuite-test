import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Element } from '../types/apiResponseTypes';

type elementsState = {
	currentElement: null | Element;
};

const initialState: elementsState = {
	currentElement: null,
};

const elementsSlice = createSlice({
	name: 'elements',
	initialState,
	reducers: {
		setCurrentElement: (state, action: PayloadAction<Element>) => {
			state.currentElement = action.payload;
		},
		clearCurrentElement: (state) => {
			state.currentElement = null;
		},
	},
});

export const { setCurrentElement, clearCurrentElement } = elementsSlice.actions;
export default elementsSlice.reducer;
