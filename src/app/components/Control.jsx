import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popup, Icon } from 'semantic-ui-react';

import CustomProgress from './CustomProgress';
import CustomProgressTime from './CustomProgressTime';
import '../../style/control.less';

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.getPlayType = this.getPlayType.bind(this);
    }

    // 获取播放方式, 单曲循环或列表循环或随机播放
    getPlayType() {
        const playType = this.props.playType;
        let icon = 'repeat';
        let content = '列表循环';
        if (playType === 'single-loop') {
            icon = 'lock';
            content = '单曲循环';
        } else if (playType === 'random') {
            icon = 'shuffle';
            content = '随机播放';
        }
        return { icon, content };
    }

    render() {
        const isPlay = this.props.playStatus === 'play';
        const playType = this.getPlayType();
        const currentTime = this.props.duration * this.props.progress;
        const mute = this.props.volume === 0;
        return (
            <div className="Control">
                <Button.Group floated="left">
                    <Button icon="step backward" color="red" onClick={this.props.handlePreSong} />
                    <Button icon={isPlay ? 'pause' : 'play'} color="red" onClick={this.props.handleChangePlayStatus} />
                    <Button icon="step forward" color="red" onClick={this.props.handleNextSong} />
                </Button.Group>
                <CustomProgress percent={this.props.progress} width="53%" inline margin="0 1em 0 2em" handleChangeProgress={this.props.handleChangeProgress} />
                <CustomProgressTime value={currentTime} total={this.props.duration} />
                <Icon name={mute ? 'volume off' : 'volume down'} size="large" onClick={this.props.handleToggleVolume} />
                <CustomProgress percent={this.props.volume} width="10%" inline handleChangeProgress={this.props.handleChangeVolume} />
                <Button.Group floated="right">
                    <Popup
                        trigger={<Button icon={playType.icon} onClick={this.props.handleChangePlayType} />}
                        on="hover"
                        content={playType.content}
                        position="top center"
                        size="mini"
                    />
                    <Popup
                        trigger={<Button content="词" floated="right" />}
                        on="hover"
                        content="歌词"
                        position="top center"
                        size="mini"
                    />
                    <Popup
                        trigger={<Button icon="list" floated="left" />}
                        on="hover"
                        content="播放列表"
                        position="top center"
                        size="mini"
                    />
                </Button.Group>
            </div>
        );
    }
}

Control.propTypes = {
    playStatus: PropTypes.string,
    playType: PropTypes.string,
    progress: PropTypes.number,
    volume: PropTypes.number,
    duration: PropTypes.number,
    handleChangePlayStatus: PropTypes.func.isRequired,
    handleChangePlayType: PropTypes.func.isRequired,
    handlePreSong: PropTypes.func.isRequired,
    handleNextSong: PropTypes.func.isRequired,
    handleChangeProgress: PropTypes.func.isRequired,
    handleChangeVolume: PropTypes.func.isRequired,
    handleToggleVolume: PropTypes.func.isRequired
};
Control.defaultProps = {
    playStatus: 'pause',
    playType: 'loop',
    progress: 0,
    volume: 0,
    duration: 0
};

export default Control;
