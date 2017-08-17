import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayOrPause = this.handlePlayOrPause.bind(this);
        this.handleChangePlayType = this.handleChangePlayType.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePlayOrPause() {
        this.props.events.handlePlayOrPause();
    }

    handleChangePlayType() {
        this.props.events.handleChangePlayType();
    }

    handlePrev() {
        this.props.events.handlePrev();
    }

    handleNext() {
        this.props.events.handleNext();
    }

    render() {
        const playStatus = this.props.status;
        const playType = this.props.type;
        return (
            <Button.Group>
                <Button icon="step backward" onClick={this.handlePrev} />
                {playStatus === 'pause' && <Button icon="play" onClick={this.handlePlayOrPause} />}
                {playStatus === 'play' && <Button icon="pause" onClick={this.handlePlayOrPause} />}
                <Button icon="step forward" onClick={this.handleNext} />
                {playType === 'loop' && <Button icon="repeat" onClick={this.handleChangePlayType} />}
                {playType === 'single-loop' && <Button icon="lock" onClick={this.handleChangePlayType} />}
                {playType === 'random' && <Button icon="shuffle" onClick={this.handleChangePlayType} />}
            </Button.Group>
        );
    }
}

ActionBar.propTypes = {
    status: PropTypes.string,
    type: PropTypes.string,
    events: PropTypes.shape({
        handlePlayOrPause: PropTypes.func.isRequired,
        handleChangePlayType: PropTypes.func.isRequired,
        handlePrev: PropTypes.func.isRequired,
        handleNext: PropTypes.func.isRequired
    }).isRequired
};
ActionBar.defaultProps = {
    status: 'pause',
    type: 'loop'
};

export default ActionBar;
