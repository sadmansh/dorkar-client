import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'

const { Sider } = Layout


class DashboardSidebar extends Component {

	componentDidMount() {
	}

	render() {
		
		return (
			<div className="sidebar">
				<Sider width={200} style={{ height: '100%' }}>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} defaultOpenKeys={['sub1']} style={{ 
						height: '100%', 
						borderRight: 0
						}}>
						<div className="logo" />
						<Menu.Item key="0"><Link to="/dashboard/listings/all">All Listings</Link></Menu.Item>
						<Menu.Item key="1"><Link to="/dashboard/listings/create">Create Listing</Link></Menu.Item>
						<Menu.Item key="3">option8</Menu.Item>
					</Menu>
				</Sider>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar)