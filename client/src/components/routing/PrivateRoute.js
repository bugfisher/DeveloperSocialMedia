import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'


const PrivateRoute = ({component:Component,auth:{isAuthenticated,loading},...rest}) => {
    return (
        <Route 
            {...rest}
            render={props=>!isAuthenticated && !loading ? (<Redirect to='/login'/>) : (<Component
                {...props}
            />)     }
            />
    )
}

const mapStatetoProps = state=>({
    auth:state.auth
});

PrivateRoute.propTypes = {

    auth:PropTypes.object.isRequired
}

export default connect(mapStatetoProps)(PrivateRoute)
