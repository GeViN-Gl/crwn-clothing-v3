import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
/*
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser,
} from './utils/firebase/firebase.utils';*/

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { checkUserSession } from './store/user/user.action';

const App = () => {
	// user subscribtion
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkUserSession());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//

	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index={true} element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
