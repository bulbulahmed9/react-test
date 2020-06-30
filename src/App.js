import React, { useReducer } from 'react';
import './App.css';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import NavMenu from './components/NavMenu/NavMenu'
import Home from './components/Home/Home';
import Blank from './components/Blank/Blank'



// Apollo Client
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.apito.io/graphql',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    }),
    cache: new InMemoryCache(),
  });
};
const client = createApolloClient();

// reducer and initial value
const initialState = {
  firstCol: "user",
  secondColData: null,
  user_id: null,
  post_id: null,
  comment_id: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        firstCol: 'user'
      }
    case 'post':
      return {
        ...state,
        firstCol: 'post'
      }
    case 'comment':
      return {
        ...state,
        firstCol: 'comment'
      }
    case 'user_id':
      return {
        ...state,
        user_id: action.id
      }
    case 'comment_id':
      return {
        ...state,
        comment_id: action.id
      }
    case 'post_id':
      return {
        ...state,
        post_id: action.id
      }
    default:
      return state;
  }
}

// use context

export const DataContext = React.createContext()




function App() {

  // global data for checking , which data should I render among user, comment, post
  const [datas, dispatch] = useReducer(reducer, initialState)

  return (

    <DataContext.Provider value={{ datas, dispatch }}>
      <ApolloProvider client={client}>
        <div className="App">
          <NavMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blank" component={Blank} />
          </Switch>
        </div>
      </ApolloProvider>
    </DataContext.Provider>
  );
}

export default App;
