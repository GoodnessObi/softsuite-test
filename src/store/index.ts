import { configureStore } from '@reduxjs/toolkit';
import elements from './elementsSlice';
import { apiService } from './apiService';

const store = configureStore({
	reducer: {
		elements,
		[apiService.reducerPath]: apiService.reducer, //add reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiService.middleware), // add middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
