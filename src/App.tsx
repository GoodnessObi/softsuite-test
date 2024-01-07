import { Navigate, Route, Routes } from 'react-router-dom';
import { PageLayout } from './layout/Layout';
import Elements from './pages/Elements/Elements';
import ElementDetails from './pages/ElementLinks/ElementLinks';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/elements' replace />} />
			<Route path='/elements' element={<PageLayout />}>
				<Route index element={<Elements />} />
				<Route path=':id' element={<ElementDetails />} />
			</Route>
		</Routes>
	);
}

export default App;
