import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CreateRent from "./components/CreateRent/CreateRent";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ProductList />} />
				<Route path="/create-rent" element={<CreateRent />} />
				<Route path="/product/:id" element={<ProductDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
