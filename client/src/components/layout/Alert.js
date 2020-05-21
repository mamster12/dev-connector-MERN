import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
    return (
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <section className="alert-container">
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
            </section>
        ))
    );
};

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
