import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux';
import RoutesConfig from './route/routes';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RoutesConfig />
    </PersistGate>
  </Provider>
);

export default App;
