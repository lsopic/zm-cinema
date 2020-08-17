import React from 'react'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './reducers/store'
import Dashboard from './containers/movieScreen/Dashboard'
import SignIn from './containers/signin/Signin'
import CreateNewMovie from './containers/movieScreen/CreateNew/CreateNewMovie'

const Routes = () => {
    return (
        <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path='/' component={SignIn} />
                        <Route exact path='/movies' component={Dashboard} />
                        <Route exact path='/createMovie' component={CreateNewMovie}/>
                    </Switch>
                </ConnectedRouter>
        </Provider>
    )
}

export default Routes
