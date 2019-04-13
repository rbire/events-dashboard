import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Ledger from './components/Ledger'
import Events from './components/Events'
import Main from './components/Main'
import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/entity' component={ Signup } />
          <Route exact path='/events' component={ Events } />
          <Route exact path='/ledger' component={ Ledger } />
          <Route exact path='/record' component={ Wizard } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )