import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost-upload';

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Success from "./pages/Success";
import SellItem from "./pages/SellItem";
import { StoreProvider } from "./utils/GlobalState";
import UserProfile from "./pages/UserProfile";
import Redirect from './pages/Redirect';
import Footer from './components/Footer';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})



//store provider from globalstate.js
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/user" component={UserProfile} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/redirect" component={Redirect} />
              <Route exact path="/sell-item" component={SellItem} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
