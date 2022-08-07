import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Layout from './components/Layout'
import DefaultMessageComponent from './components/Messages/DefaultMessageComponent'
import Messages from './components/Messages'
import {store} from './redux/store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<DefaultMessageComponent />} />
            <Route path="/dialog/:dialog_id" element={<Messages />} />
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
