import React from 'react'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './reducers/store'
import Dashboard from './containers/dashboard/Dashboard'
import SignIn from './containers/signin/Signin'

const Routes = () => {
    return (
        <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path='/' component={SignIn} />
                        <Route exact path='/movies' component={Dashboard} />
                    </Switch>
                </ConnectedRouter>
        </Provider>
    )
}

export default Routes
