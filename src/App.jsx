import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CreateRent from "./components/CreateRent/CreateRent";
import './index.scss';
import SearchResult from "./components/SearchResult/SearchResult.jsx";
import { PopularQueries } from './components/PopularQueries/PopularQueries.jsx';


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ProductList />} />
				<Route path="/create-rent" element={<CreateRent />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/search" element={<SearchResult />} />
				<Route path="/popular-queries" element={<PopularQueries />} />
			</Routes>
		</Router>
	);
}

export default App;
