import React from "react";
import { BrowserRouter as Route } from 'react-router-dom';

import Header from "./Header";
import NotFound from "./NotFound";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Route path="*">
          <NotFound />
        </Route>
      </div>
    </>
  );
}

export default Layout;
