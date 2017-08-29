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
        const isLoading = this.props.playStatus === 'loading';
        const playType = this.getPlayType();
        const currentTime = this.props.duration * this.props.progress;
        const { mute, width } = this.props;
        let restWidth;
        let progressWidth;
        let volumeWidth;
        if (width < 800) {
            restWidth = (width * 0.87) - 300;
            progressWidth = (restWidth * 100) / width;
        } else {
            restWidth = (width * 0.87) - 320;
            progressWidth = (restWidth * 80) / width;
            volumeWidth = (restWidth * 20) / width;
        }
        return (
            <div className="Control">
                <Button.Group floated="left">
                    <Button icon="step backward" color="red" onClick={this.props.handlePreSong} />
                    <Button loading={isLoading} icon={isPlay ? 'pause' : 'play'} color="red" onClick={this.props.handleChangePlayStatus} />
                    <Button icon="step forward" color="red" onClick={this.props.handleNextSong} />
                </Button.Group>
                <CustomProgress percent={this.props.progress} width={`${progressWidth}%`} inline margin="0 1% 0 2%" handleChangeProgress={this.props.handleChangeProgress} />
                <CustomProgressTime value={currentTime} total={this.props.duration} />
                {
                    this.props.width >= 800 &&
                    <Icon name={mute ? 'volume off' : 'volume down'} size="large" onClick={this.props.handleToggleVolume} />
                }
                {
                    this.props.width >= 800 &&
                    <CustomProgress
                        percent={this.props.volume}
                        color={mute ? 'grey' : 'red'}
                        width={`${volumeWidth}%`}
                        inline
                        handleChangeProgress={this.props.handleChangeVolume}
                    />
                }
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
                        trigger={<Button icon="list" floated="left" onClick={this.props.handleToggleListPanel} />}
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
    mute: PropTypes.bool.isRequired,
    duration: PropTypes.number,
    handleChangePlayStatus: PropTypes.func.isRequired,
    handleChangePlayType: PropTypes.func.isRequired,
    handlePreSong: PropTypes.func.isRequired,
    handleNextSong: PropTypes.func.isRequired,
    handleChangeProgress: PropTypes.func.isRequired,
    handleChangeVolume: PropTypes.func.isRequired,
    handleToggleVolume: PropTypes.func.isRequired,
    handleToggleListPanel: PropTypes.func.isRequired,
    width: PropTypes.number
};
Control.defaultProps = {
    playStatus: 'pause',
    playType: 'loop',
    progress: 0,
    volume: 0,
    duration: 0,
    width: 0
};

export default Control;
