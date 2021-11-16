/* eslint-disable */
import React, { useState, useEffect, Suspense } from "react";
import { Navbar, Nav } from "rsuite";
import { Switch, Route, useHistory } from "react-router-dom";
import { LoadingPage } from "../components/LoadingPage";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const MostVoted = React.lazy(() => import("./MostVoted"));
const Newest = React.lazy(() => import("./Newest"));
const PageNotFound = React.lazy(() => import("./PageNotFound"));

const config_links = {
  root: "/",
  newest: "/newest",
  mostVoted: "/most-voted",
  about: "/about",
};
const routes = [
  {
    path: config_links.root,
    component: Home,
  },
  {
    path: config_links.newest,
    component: Newest,
  },
  {
    path: config_links.mostVoted,
    component: MostVoted,
  },
  {
    path: config_links.about,
    component: About,
  },
];

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = React.memo(({}) => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {}, []);

  //@ts-ignore
  const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
    return (
      <Navbar {...props}>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item
            eventKey="1"
            onClick={() => {
              history.push(config_links.root);
            }}
          >
            Home
          </Nav.Item>
          <Nav.Item
            eventKey="2"
            onClick={() => {
              history.push(config_links.newest);
            }}
          >
            Newest questions
          </Nav.Item>
          <Nav.Item
            eventKey="3"
            onClick={() => {
              history.push(config_links.mostVoted);
            }}
          >
            The most voted questions
          </Nav.Item>
          <Nav.Item
            eventKey="4"
            onClick={() => {
              history.push(config_links.about);
            }}
          >
            About
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };

  return (
    <div className="">
      <NavBarInstance
        appearance="inverse"
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
      <div className="px-4 py-4 md:px-10 md:py-10">
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={true}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              ) : null;
            })}
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
});

export { Layout as default };

const styles = {};
