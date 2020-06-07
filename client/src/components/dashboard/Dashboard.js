import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProfile} from '../../actions/profile'
import Spinner from '../../components/layout/Spinner'
import DashboardActions from '../../components/dashboard/DashboardActions'
import AddExperience from '../../components/dashboard/Experience'
import AddEducation from '../../components/dashboard/Education'


const Dashboard = props => {
    
  useEffect(()=>{

    props.getProfile();

  },[]);

  return props.profile.loading && props.profile.profile === null ? <Spinner/>: <Fragment>

          <h1 class="large text-primary">
            Dashboard
          </h1>
          <p class="lead"><i class="fas fa-user"></i> Welcome {props.auth.user && props.auth.user.name}</p>

          {props.profile.profile !==null ? (<Fragment>
            <DashboardActions/>
            <AddExperience  experience={props.profile.profile.experience} />
            <AddEducation  education={props.profile.profile.education} />
          </Fragment>) :
           
           (
            <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
        </Fragment>
          )}

  </Fragment>
  
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
