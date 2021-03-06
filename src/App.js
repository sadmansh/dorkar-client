import React, {Component} from 'react'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Geocode from 'react-geocode'

import dorkarApp from './reducers'
import {auth} from './actions'

import Login from './components/Account/Login'
import Register from './components/Account/Register'
import VerifyPhone from './components/Account/VerifyPhone'
import Dashboard from './components/Account/Dashboard'
import Search from './components/Services/Search'
import Results from './components/Services/Results'

let store = createStore(dorkarApp, applyMiddleware(thunk))

Geocode.setApiKey('AIzaSyD3w9NAB7-dK--R-VewrBYWJeG4utgQOdQ')


class RootContainerComponent extends Component {
	componentDidMount() {
		this.props.loadUser()
	}

	PrivateRoute = ({component: ChildComponent, ...rest}) => {
		return <Route {...rest} render={props => {
			if (this.props.auth.isLoading) {
				return <em>Loading...</em>
			}
			else if (!this.props.auth.isAuthenticated) {
				return <Redirect to="/login" />
			}
			else {
				return <ChildComponent {...props} />
			}
		}} />
	}

	render() {
		let {PrivateRoute} = this
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Search} />
					<Route exact path="/search" component={Results} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<PrivateRoute exact path="/verify/phone" component={VerifyPhone} />
				</Switch>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadUser: () => {
			return dispatch(auth.loadUser())
		}
	}
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootContainer />
			</Provider>
		)
	}
}