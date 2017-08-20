import React from 'react';
import PropTypes from 'prop-types';

import Utils from '../Utils';

function CustomProgressTime({ value, total }) {
    const valueStr = Utils.parseTime(value);
    const totalStr = Utils.parseTime(total);
    return (
        <div className="progress-time">{valueStr}/{totalStr}</div>
    );
}

CustomProgressTime.propTypes = {
    value: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default CustomProgressTime;
