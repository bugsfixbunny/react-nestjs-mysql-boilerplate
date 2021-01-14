import React from 'react';
import PagesNavigation from './pages/pages.navigation';
import { Provider } from "react-redux";
import { store } from "./store/configure.store";
import './App.css';
import MeSlice from './store/slices/me.slice';
import { getMe } from './services/users.service';

function App() {

  const me = async () => {
    const res = await getMe();
    if (res) {
      store.dispatch(MeSlice.actions.setMe(res));
    }
    else localStorage.removeItem('token');
  }

  React.useEffect(() => {
    document.title = "Starter web";
    me();
  }, []);

  return (
    <Provider store={store}>
      <PagesNavigation />
    </Provider>
  );
}

export default App;
