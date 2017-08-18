import React from 'react';
import { Container } from 'semantic-ui-react';

import CustomProgress from './CustomProgress';
import Cover from './Cover';
import ActionBar from './ActionBar';
import MusicInfo from './MusicInfo';
import Data from '../Data';
// import DefaultCover from '../../src/image/logo.png';
import CDCover1 from '../../image/cd2.jpeg';
import '../../style/player.less';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.data = new Data();
        this.state = {
            status: 'pause',
            type: 'loop',
            progress: 0,
            music: null
        };
        this.playOrPause = this.playOrPause.bind(this);
        this.changePlayType = this.changePlayType.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.refreshSong = this.refreshSong.bind(this);
        this.handleChangeProgress = this.handleChangeProgress.bind(this);
        this.actionBarEvents = {
            handlePlayOrPause: this.playOrPause,
            handleChangePlayType: this.changePlayType,
            handlePrev: this.prevSong,
            handleNext: this.nextSong
        };
    }

    componentWillMount() {
        const music = this.data.get();
        this.refreshSong(music);
        this.setState({ music });
    }

    componentDidMount() {
        this.audio = document.getElementById('audio');
        this.audio.oncanplay = () => {
            if (this.state.status === 'play') {
                this.audio.play();
            }
        };
        // 播放完毕
        this.audio.onended = () => {
            this.nextSong();
        };
    }

    // 播放/暂停
    playOrPause() {
        const audio = this.audio;
        let status = this.state.status;
        if (status === 'play') {
            status = 'pause';
            audio.pause();
            if (this.task) {
                clearInterval(this.task);
            }
        } else if (status === 'pause') {
            status = 'play';
            audio.play();
            this.task = setInterval(() => {
                const progress = this.audio.currentTime / this.audio.duration;
                this.setState({
                    progress
                });
            }, 500);
        }
        this.setState({
            status
        });
    }

    // 切换播放方式，随机/列表循环/单曲循环
    changePlayType() {
        let type = this.state.type;
        if (type === 'loop') {
            type = 'single-loop';
        } else if (type === 'single-loop') {
            type = 'random';
        } else if (type === 'random') {
            type = 'loop';
        }
        this.setState({
            type
        });
    }

    // 上一曲
    prevSong() {
        let music;
        if (this.state.type === 'loop') { // 列表循环
            music = this.data.prev();
        } else if (this.state.type === 'single-loop') { // 单曲循环
            music = this.data.get();
        } else { // 随机播放
            music = this.data.random();
        }
        this.refreshSong(music);
        this.setState({
            music,
            progress: 0
        });
    }
    // 下一曲
    nextSong() {
        let music = null;
        if (this.state.type === 'loop') { // 列表循环
            music = this.data.next();
        } else if (this.state.type === 'single-loop') { // 单曲循环
            music = this.data.get();
        } else { // 随机播放
            music = this.data.random();
        }
        this.refreshSong(music);
        this.setState({
            music,
            progress: 0
        });
    }
    // 刷新当前歌曲信息
    refreshSong(music) {
        this.musicInfo = {
            song: music.song,
            singer: music.singer,
            time: music.time
        };
        this.musicSrc = music.src;
        if (music.cover) {
            this.musicCover = music.cover;
        } else {
            this.musicCover = CDCover1;
        }
    }
    // 改变播放进度
    handleChangeProgress(progress) {
        this.audio.currentTime = progress * this.audio.duration;
        this.setState({
            progress
        });
    }

    render() {
        return (
            <Container textAlign="center" fluid className="player-container" >
                <Cover image={this.musicCover} />
                <MusicInfo music={this.musicInfo} />
                <CustomProgress
                    color="red"
                    percent={this.state.progress}
                    handleChangeProgress={this.handleChangeProgress}
                />
                <ActionBar status={this.state.status} type={this.state.type} events={this.actionBarEvents} />
                <audio id="audio" src={this.musicSrc} loop={this.state.type === 'single-loop' && 'loop'} >
                    <track kind="captions" />
                </audio>
            </Container>
        );
    }
}

export default Player;
