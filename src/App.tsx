import { Navigate, Route, Routes } from 'react-router-dom';
import { PageLayout } from './layout/Layout';
import Elements from './pages/Elements/Elements';
import ElementPage from './pages/Element/Element';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/elements' replace />} />
			<Route path='/elements' element={<PageLayout />}>
				<Route index element={<Elements />} />
				<Route path=':id' element={<ElementPage />} />
			</Route>
		</Routes>
	);
}

export default App;
