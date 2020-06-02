import React,{ Fragment,useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect } from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';
import {register} from '../../actions/auth'




const Register = (props) => {


    const [formData,setFormData] = useState({

        name:'',
        email:'',
        password:'',
        password2:''

    });

    const onChange = (e) => setFormData({...formData,[e.target.name]:e.target.value});

    const {name,email,password,password2} = formData;
    


    const onSubmit = async (e) =>{

        e.preventDefault();
        if(password !== password2)
        {
            props.setAlert('Passwords do not match','danger');
        }
        else{
            
            
           props.register({name,email,password});

        }
    };

    if(props.isAuthenticated)
    {
      return <Redirect to='/dashboard'/>
    }

    return (
       <Fragment>
           
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)} >
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}   />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} onChange={e => onChange(e)}
            
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
       </Fragment>
    )
}

const mapStatetoProps = state =>({

  isAuthenticated : state.auth.isAuthenticated
});

Register.propTypes = {
  setAlert : PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};

export default connect(mapStatetoProps,{setAlert,register})(Register)
