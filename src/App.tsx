import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

const {
  REACT_APP_SSO_HOST: hostSSO,
  REACT_APP_SELL_HOST: hostSell,
  REACT_APP_INVEST_HOST: hostInvest
} = process.env as Record<string, string>;

const AppSso = ({ history }: { history: History }) => <MicroFrontend history={history} host={hostSSO} name="sso" />;
const AppSell = ({ history }: { history: History }) => <MicroFrontend history={history} host={hostSell} name="sell" />;
const AppInvest = ({ history }: { history: History }) => (
  <MicroFrontend history={history} host={hostInvest} name="invest" />
);

const Header = () => (
  <>
    <h1>Some header</h1>
    <ul>
      <li>
        <Link to="/">sso</Link>
      </li>
      <li>
        <Link to="/invest">invest</Link>
      </li>
      <li>
        <Link to="/sell">sell</Link>
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
          <Route exact path="/" component={AppSso} />
          <Route exact path="/sell" component={AppSell} />
          <Route exact path="/invest" component={AppInvest} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
