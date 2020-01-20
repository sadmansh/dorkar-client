import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {auth} from '../../actions'

import DashboardSidebar from './Dashboard/Sidebar'
import CreateListing from './Dashboard/CreateListing'
import AllListings from './Dashboard/AllListings'
import Search from '../Services/Search'

import { Layout } from 'antd'
import 'antd/dist/antd.css'

const { Content } = Layout


class Dashboard extends Component {

	render() {
		if (!this.props.user.phone_verified) {
			return <Redirect push to={{pathname: '/verify/phone', state: {code: '442322'}}} />
		}
		
		return (
			<div id="dashboard">
				<Layout>
					<DashboardSidebar />

					<Layout style={{ padding: '0 1rem 1rem', marginLeft: '200px' }}>
						<Content style={{
							background: '#fff',
							padding: '2rem',
							margin: 0,
							minHeight: '100vh',
						}}>
							<h1>Welcome to your dashboard, {this.props.user.name}</h1>
							<p onClick={this.props.logout}>Logout</p>
							<Switch>
								<Route path="/dashboard/listings/all" component={AllListings} />
								<Route path="/dashboard/listings/create" component={CreateListing} />
							</Switch>
						</Content>
					</Layout>

				</Layout>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			dispatch(auth.logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)