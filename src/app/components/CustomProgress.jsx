import React from 'react';
import PropTypes from 'prop-types';

import '../../style/customProgress.less';

class CustomProgress extends React.Component {
    constructor(props) {
        super(props);
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
                className="progress-bar"
                style={{
                    width: this.props.width,
                    display: this.props.inline && 'inline-block',
                    margin: this.props.margin
                }}
            >
                <div
                    className={`ui ${this.props.color} tiny progress`}
                    onClick={this.handleChangeProgress}
                    ref={(p) => { this.progress = p; }}
                >
                    <div className="bar" style={{ width: `${this.props.percent * 100}%` }} />
                </div>
            </div>
        );
    }
}

CustomProgress.propTypes = {
    color: PropTypes.string,
    percent: PropTypes.number,
    width: PropTypes.string,
    inline: PropTypes.bool,
    margin: PropTypes.string,
    handleChangeProgress: PropTypes.func
};

CustomProgress.defaultProps = {
    color: 'red',
    percent: 0,
    width: '100%',
    inline: false,
    margin: '',
    handleChangeProgress: () => {}
};

export default CustomProgress;
