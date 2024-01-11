import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementLink } from '../types/apiResponseTypes';

type elementLinksState = {
	currentElementLink: null | ElementLink;
	currentDetailId: null | ElementLink['id'];
	isDetailsModalOpen: boolean;
};

const initialState: elementLinksState = {
	currentElementLink: null,
	currentDetailId: null,
	isDetailsModalOpen: false,
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
		setCurrentDetailId: (state, action: PayloadAction<ElementLink['id']>) => {
			state.currentDetailId = action.payload;
		},
		clearCurrentDetailId: (state) => {
			state.currentDetailId = null;
		},
		openDetailsModal: (state, action: PayloadAction<ElementLink['id']>) => {
			state.isDetailsModalOpen = true;
			state.currentDetailId = action.payload;
		},
		closeDetailsModal: (state) => {
			state.isDetailsModalOpen = false;
			state.currentDetailId = null;
		},
	},
});

export const {
	setCurrentElementLink,
	clearCurrentElementLink,
	setCurrentDetailId,
	clearCurrentDetailId,
	openDetailsModal,
	closeDetailsModal,
} = elementLinksSlice.actions;
export default elementLinksSlice.reducer;
