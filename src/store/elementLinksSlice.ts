import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementLink } from '../types/apiResponseTypes';

type elementLinksState = {
	currentElementLink: null | ElementLink;
};

const initialState: elementLinksState = {
	currentElementLink: null,
};

const elementLinksSlice = createSlice({
	name: 'elementLinks',
	initialState,
	reducers: {
		setCurrentElementLink: (state, action: PayloadAction<ElementLink>) => {
			state.currentElementLink = action.payload;
		},
		clearCurrentElementLink: (state) => {
			state.currentElementLink = null;
		},
	},
});

export const { setCurrentElementLink, clearCurrentElementLink } =
	elementLinksSlice.actions;
export default elementLinksSlice.reducer;
