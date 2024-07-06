import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import CreateRent from "./components/CreateRent/CreateRent"; // Імпортуйте компонент CreateRent

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ProductList />} />
				<Route path="/create-rent" element={<CreateRent />} /> {/* Додайте маршрут для CreateRent */}
			</Routes>
		</Router>
	);
}

export default App;
