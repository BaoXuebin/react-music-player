import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    play, pause, changeProgress, changeVolume, closeMute, openMute,
    changePlayType
} from '../action/action';
import TopHeader from '../components/TopHeader';
import Info from '../components/Info';
import Control from '../components/Control';
import MusicList from '../components/MusicList';
import Action from '../Action';
import Data from '../Data';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.action = new Action(this);
        // 初始化状态
        this.action.initState();
        this.changePlayStatus = this.changePlayStatus.bind(this);
        this.changePlayType = this.changePlayType.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.changeProgress = this.changeProgress.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.loadFinish = this.loadFinish.bind(this);
        this.toggleVolume = this.toggleVolume.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
        this.handlePlaySong = this.handlePlaySong.bind(this);
    }
    // 组件将要挂载
    componentWillMount() {
        this.action.initMusic();
        this.updateTime = moment().format('YYYY-MM-DD hh:mm:ss');
        // 从接口获取音乐列表
        Data.fetch();
    }
    // 组件已经挂载
    componentDidMount() {
        if (!this.audio) {
            this.audio = document.getElementById('audio');
        }
        // 加载完成
        this.audio.oncanplay = this.loadFinish;
        // 播放完毕
        this.audio.onended = this.nextSong;
    }
    // 歌曲加载完成
    loadFinish() {
        this.setState({
            duration: this.audio.duration,
            volume: this.audio.volume,
            loaded: true
        });
        if (this.state.status === 'play') {
            this.audio.play();
        }
    }
    // 修改播放状态
    changePlayStatus() {
        const audio = this.audio;
        const status = this.props.status;
        if (status === 'play') {
            audio.pause();
            if (this.task) {
                clearInterval(this.task);
            }
            this.props.dispatch(pause());
        } else if (status === 'pause') {
            audio.play();
            this.task = setInterval(() => {
                const progress = this.audio.currentTime / this.audio.duration;
                this.props.dispatch(changeProgress(progress));
            }, 500);
            this.props.dispatch(play());
        }
    }
    // 修改播放类型
    changePlayType() {
        let type = this.props.playType;
        if (type === 'loop') {
            type = 'single-loop';
        } else if (type === 'single-loop') {
            type = 'random';
        } else {
            type = 'loop';
        }
        this.props.dispatch(changePlayType(type));
    }
    // 修改歌曲进度
    changeProgress(progress) {
        this.audio.currentTime = progress * this.audio.duration;
        this.props.dispatch(changeProgress(progress));
    }
    // 修改音量
    changeVolume(volume) {
        // 当前静音
        this.audio.volume = volume < 0 ? 0 : volume;
        this.props.dispatch(changeVolume(volume));
    }
    // 是否静音
    toggleVolume() {
        const { volume, mute } = this.props;
        if (mute) {
            // 关闭静音
            this.audio.volume = volume;
            this.props.dispatch(closeMute());
        } else {
            // 打开静音
            this.audio.volume = 0;
            this.props.dispatch(openMute());
        }
    }
    // 上一曲
    prevSong() {
        this.action.preSong();
    }
    // 下一曲
    nextSong() {
        this.action.nextSong();
    }

    togglePanel() {
        this.action.toggleListPanel();
    }

    // 列表点击音乐，播放音乐
    // id 被点击的歌曲 id
    handlePlaySong(id) {
        this.action.playSong(id);
    }

    render() {
        const { status, progress, volume, mute, playType } = this.props;
        const coverRotate = this.state.loaded && status === 'play';
        return (
            <div>
                <TopHeader />
                <Sidebar.Pushable>
                    <Sidebar animation="overlay" visible={this.state.listVisible} width="wide" direction="right">
                        <MusicList
                            music={this.state.music}
                            handlePlaySong={this.handlePlaySong}
                            updateTime={this.updateTime}
                        />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Info music={this.state.music} coverRotate={coverRotate} />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <Control
                    playStatus={status}
                    playType={playType}
                    progress={progress}
                    volume={volume}
                    mute={mute}
                    duration={this.state.duration}
                    handleChangePlayStatus={this.changePlayStatus}
                    handleChangePlayType={this.changePlayType}
                    handlePreSong={this.prevSong}
                    handleNextSong={this.nextSong}
                    handleChangeProgress={this.changeProgress}
                    handleChangeVolume={this.changeVolume}
                    handleToggleVolume={this.toggleVolume}
                    handleToggleListPanel={this.togglePanel}
                />
                <audio id="audio" src={this.state.music.src} loop={this.state.type === 'single-loop' && 'loop'} >
                    <track kind="captions" />
                </audio>
            </div>
        );
    }
}

Player.propTypes = {
    status: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    mute: PropTypes.bool.isRequired,
    playType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { status, progress, volume, mute, playType } = state;
    return {
        status,
        progress,
        volume,
        mute,
        playType
    };
}

export default connect(mapStateToProps)(Player);
