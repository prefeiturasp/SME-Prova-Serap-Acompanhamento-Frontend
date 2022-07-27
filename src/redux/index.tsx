import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './modules/reducers';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

const middlewares = [thunk];

export type AppState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(
  {
    key: 'SERAP-ACOMPANHAMENTO-PERSIST',
    storage,
    whitelist: ['auth'],
  },
  rootReducer,
);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };
