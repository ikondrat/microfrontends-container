import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

const { REACT_APP_HOST_INTRO, REACT_APP_HOST_PRODUCTS, REACT_APP_HOST_BASKET } = process.env as Record<string, string>;

const AppIntro = ({ history }: { history: History }) => (
  <MicroFrontend history={history} host={REACT_APP_HOST_INTRO} name="intro" />
);
const AppProducts = ({ history }: { history: History }) => (
  <MicroFrontend history={history} host={REACT_APP_HOST_PRODUCTS} name="products" />
);
const AppBasket = ({ history }: { history: History }) => (
  <MicroFrontend history={history} host={REACT_APP_HOST_BASKET} name="basket" />
);

const Header = () => (
  <>
    <h1>Super awesome online market</h1>
    <ul>
      <li>
        <Link to="/">intro</Link>
      </li>
      <li>
        <Link to="/products">products</Link>
      </li>
      <li>
        <Link to="/basket">basket</Link>
      </li>
    </ul>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={AppIntro} />
          <Route exact path="/products" component={AppProducts} />
          <Route exact path="/basket" component={AppBasket} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
