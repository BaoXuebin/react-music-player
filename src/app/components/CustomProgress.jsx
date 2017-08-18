import React from 'react';
import PropTypes from 'prop-types';

import '../../style/customProgress.less';

class CustomProgress extends React.Component {
    constructor(props) {
        super(props);
        this.color = props.color || 'blue';
        this.handleChangeProgress = this.handleChangeProgress.bind(this);
    }

    handleChangeProgress(e) {
        const clkProgress =
            (e.clientX - this.progress.getBoundingClientRect().left) / this.progress.clientWidth;
        this.props.handleChangeProgress(clkProgress);
    }

    render() {
        return (
            <div
                className={`ui ${this.color} tiny progress`}
                onClick={this.handleChangeProgress}
                ref={(p) => { this.progress = p; }}
            >
                <div className="bar" style={{ width: `${this.props.percent * 100}%` }} />
            </div>
        );
    }
}

CustomProgress.propTypes = {
    color: PropTypes.string,
    percent: PropTypes.number,
    handleChangeProgress: PropTypes.func
};

CustomProgress.defaultProps = {
    color: 'red',
    percent: 0,
    handleChangeProgress: () => {}
};

export default CustomProgress;
