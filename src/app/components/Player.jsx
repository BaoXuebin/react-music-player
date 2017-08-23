import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    play, pause, changeProgress, changeVolume, closeMute, openMute, initPlayer,
    changePlayType, playSpecifiedSong, fetchMusicsIfNeeded, toggleSlideBar, getMusicDuration
} from '../action/action';
import TopHeader from '../components/TopHeader';
import Info from '../components/Info';
import Control from '../components/Control';
import MusicList from '../components/MusicList';
import Utils from '../Utils';

class Player extends React.Component {
    constructor(props) {
        super(props);
        // 初始化状态
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
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    // 组件将要挂载
    componentWillMount() {
        this.props.dispatch(initPlayer());
        // 请求接口获取音乐列表
        this.props.dispatch(fetchMusicsIfNeeded());
    }
    // 组件已经挂载
    componentDidMount() {
        if (!this.audio) {
            this.audio = document.getElementById('audio');
        }
        // 加载完成
        this.audio.oncanplay = this.loadFinish;
        // 加载失败
        // this.audio.onerror = () => {
        //
        // };
        // 播放完毕
        this.audio.onended = this.nextSong;
    }
    // 歌曲加载完成
    loadFinish() {
        this.props.dispatch(getMusicDuration(this.audio.duration));
        const status = this.props.status;
        if (status === 'play') {
            this.audio.play();
            if (this.task) {
                clearInterval(this.task);
            }
            this.task = setInterval(() => {
                const progress = this.audio.currentTime / this.audio.duration;
                this.props.dispatch(changeProgress(progress));
            }, 500);
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
            this.props.dispatch(play());
            this.audio.play();
            this.task = setInterval(() => {
                const progress = this.audio.currentTime / this.audio.duration;
                this.props.dispatch(changeProgress(progress));
            }, 500);
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
        const { currentMusicId, playType, musics } = this.props;
        if (playType === 'loop') { // 列表循环
            this.props.dispatch(playSpecifiedSong(Utils.last(currentMusicId, musics)));
        } else if (playType === 'single-loop') { // 单曲循环
            this.props.dispatch(playSpecifiedSong(currentMusicId));
        } else { // 随机播放
            this.props.dispatch(playSpecifiedSong(Utils.random(currentMusicId, musics)));
        }
    }
    // 下一曲
    nextSong() {
        const { currentMusicId, playType, musics } = this.props;
        if (playType === 'loop') { // 列表循环
            this.props.dispatch(playSpecifiedSong(Utils.next(currentMusicId, musics)));
        } else if (playType === 'single-loop') { // 单曲循环
            this.props.dispatch(playSpecifiedSong(currentMusicId));
        } else { // 随机播放
            this.props.dispatch(playSpecifiedSong(Utils.random(currentMusicId, musics)));
        }
    }

    togglePanel() {
        const visible = this.props.listVisible;
        this.props.dispatch(toggleSlideBar(visible));
    }

    // 列表点击音乐，播放音乐
    // id 被点击的歌曲 id
    handlePlaySong(id) {
        this.props.dispatch(playSpecifiedSong(id));
    }
    // 刷新歌单
    handleRefresh() {
        this.props.dispatch(fetchMusicsIfNeeded());
    }

    render() {
        const { ifReady, currentMusicId, status, progress, volume, mute,
            playType, listVisible, musics, receivedAt, duration } = this.props;
        const coverRotate = status === 'play';
        const music = Utils.get(currentMusicId, musics);
        return (
            <div>
                {ifReady &&
                    <div>
                        <TopHeader />
                        <Sidebar.Pushable>
                            <Sidebar animation="overlay" color="white" visible={listVisible} width="wide" direction="right">
                                <MusicList
                                    currentMusicId={currentMusicId}
                                    musics={musics}
                                    handlePlaySong={this.handlePlaySong}
                                    handleRefresh={this.handleRefresh}
                                    receivedAt={receivedAt}
                                />
                            </Sidebar>
                            <Sidebar.Pusher>
                                <Info music={music} coverRotate={coverRotate} />
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                        <Control
                            playStatus={status}
                            playType={playType}
                            progress={progress}
                            volume={volume}
                            mute={mute}
                            duration={duration}
                            handleChangePlayStatus={this.changePlayStatus}
                            handleChangePlayType={this.changePlayType}
                            handlePreSong={this.prevSong}
                            handleNextSong={this.nextSong}
                            handleChangeProgress={this.changeProgress}
                            handleChangeVolume={this.changeVolume}
                            handleToggleVolume={this.toggleVolume}
                            handleToggleListPanel={this.togglePanel}
                        />
                    </div>
                }
                <audio id="audio" src={music ? music.src : ''} loop={playType === 'single-loop' && 'loop'} >
                    <track kind="captions" />
                </audio>
            </div>
        );
    }
}

Player.propTypes = {
    ifReady: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    mute: PropTypes.bool.isRequired,
    playType: PropTypes.string.isRequired,
    currentMusicId: PropTypes.string.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        song: PropTypes.string,
        singer: PropTypes.string,
        src: PropTypes.string.isRequired,
        cover: PropTypes.string
    })).isRequired,
    listVisible: PropTypes.bool.isRequired,
    receivedAt: PropTypes.string.isRequired,
    duration: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};
Player.defaultProps = {
    duration: 0
};

function mapStateToProps(state) {
    const { currentMusicId, ifReady, status, progress, volume, mute, playType,
        listVisible, musics, receivedAt, duration } = state;
    return {
        currentMusicId,
        ifReady,
        status,
        progress,
        volume,
        mute,
        playType,
        listVisible,
        musics,
        receivedAt,
        duration
    };
}

export default connect(mapStateToProps)(Player);
