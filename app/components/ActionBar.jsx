import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayOrPause = this.handlePlayOrPause.bind(this);
        this.handleChangePlayType = this.handleChangePlayType.bind(this);
    }

    handlePlayOrPause() {
        this.props.handlePlayOrPause();
    }

    handleChangePlayType() {
        this.props.handleChangePlayType();
    }

    render() {
        const playStatus = this.props.status;
        const playType = this.props.type;
        return (
            <Button.Group>
                <Button icon="step backward" />
                {playStatus === 'play' && <Button icon="play" onClick={this.handlePlayOrPause} />}
                {playStatus === 'pause' && <Button icon="pause" onClick={this.handlePlayOrPause} />}
                <Button icon="step forward" />
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
    handlePlayOrPause: PropTypes.func.isRequired,
    handleChangePlayType: PropTypes.func.isRequired
};
ActionBar.defaultProps = {
    status: 'pause',
    type: 'loop'
};

export default ActionBar;
