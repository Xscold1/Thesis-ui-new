import React from "react";

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';
import 'popper.js';

// redux
import { Provider } from "react-redux";
import { store } from "./src/app/stores/store";

// routes
import AppRoutes from "./src/app/routes/router";

//styling
import '../src/app/styles/main.scss';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
