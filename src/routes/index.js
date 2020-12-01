import React from 'react';
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RedirectPage from '../pages/RedirectPage';
import StatsPage from '../pages/StatsPage';
import NotFound from '../pages/NotFound';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/:code" component={RedirectPage}/>
                <Route exact path="/:code/stats" component={StatsPage}/>
                <Route exact path="/*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;