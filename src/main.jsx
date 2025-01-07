import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './ReduxStore/store.jsx'
// import Text from '../text.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <App />
  {/* <Text /> */}
 </Provider> 






)

