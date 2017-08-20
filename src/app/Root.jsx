import React from 'react';

import TopHeader from './components/TopHeader';
import Info from './components/Info';
import Control from './components/Control';
import Action from './Action';

export default class Root extends React.Component {
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
    }
    // 组件将要挂载
    componentWillMount() {
        this.action.initMusic();
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
        const status = this.state.status;
        if (status === 'play') {
            audio.pause();
            if (this.task) {
                clearInterval(this.task);
            }
        } else if (status === 'pause') {
            audio.play();
            this.task = setInterval(() => {
                const progress = this.audio.currentTime / this.audio.duration;
                this.setState({
                    progress
                });
            }, 500);
        }
        this.action.changePlayStatus();
    }
    // 修改播放类型
    changePlayType() {
        this.action.changePlayType();
    }
    // 修改歌曲进度
    changeProgress(progress) {
        this.audio.currentTime = progress * this.audio.duration;
        this.setState({
            progress
        });
    }
    // 修改音量
    changeVolume(v) {
        // 当前静音
        let lastVolume = this.state.lastVolume;
        if (this.state.volume === 0) {
            lastVolume = 0;
        }
        let volume = 0;
        if (v > 0.01) {
            volume = v;
        }
        this.audio.volume = volume;
        this.setState({
            volume,
            lastVolume
        });
    }
    // 关闭音量
    toggleVolume() {
        this.audio.volume = this.state.lastVolume;
        this.action.toggleVolume();
    }
    // 上一曲
    prevSong() {
        this.action.preSong();
    }
    // 下一曲
    nextSong() {
        this.action.nextSong();
    }

    render() {
        const coverRotate = this.state.loaded && this.state.status === 'play';
        return (
            <div>
                <TopHeader />
                <Info music={this.state.music} coverRotate={coverRotate} />
                <Control
                    playStatus={this.state.status}
                    playType={this.state.type}
                    progress={this.state.progress}
                    volume={this.state.volume}
                    duration={this.state.duration}
                    handleChangePlayStatus={this.changePlayStatus}
                    handleChangePlayType={this.changePlayType}
                    handlePreSong={this.prevSong}
                    handleNextSong={this.nextSong}
                    handleChangeProgress={this.changeProgress}
                    handleChangeVolume={this.changeVolume}
                    handleToggleVolume={this.toggleVolume}
                />
                <audio id="audio" src={this.state.music.src} loop={this.state.type === 'single-loop' && 'loop'} >
                    <track kind="captions" />
                </audio>
            </div>
        );
    }
}
