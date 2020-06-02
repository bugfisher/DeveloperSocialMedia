import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alert = ({alerts}) => alerts.length > 0 && alerts != null && alerts.map(alert =>(

    <div id={alerts.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));

Alert.propTypes = {

    alerts:PropTypes.array.isRequired

}

const mapStatetoProps = state =>({

    alerts:state.alert
});

export default connect(mapStatetoProps)(Alert)
