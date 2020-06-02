import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfile} from '../../actions/profile'


const Dashboard = props => {
    
  useEffect(()=>{

    props.getProfile();

  },[]);
  
  return (
        <div>
          Dashboard  
        </div>
    )
}

Dashboard.propTypes = {

  getProfile:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
}

const mapStatetoProps = (state) =>({

  auth:state.auth,
  profile:state.profile
});

export default connect(mapStatetoProps,{getProfile})(Dashboard);
