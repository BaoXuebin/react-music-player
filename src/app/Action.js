// 行为封装类
import Data from './Data';

export default class Action {
    constructor(component) {
        this.component = component;
        this.data = new Data();
    }

    // 初始化状态
    initState() {
        this.component.state = {
            status: 'pause', // 播放状态
            type: 'loop', // 播放类型
            music: null, // 当前播放的音乐信息
            progress: 0, // 当前播放进度
            volume: 0, // 当前音量
            lastVolume: 0, // 静音前音量
            loaded: false, // 歌曲是否加载完毕
            listVisible: false
        };
    }

    // 修改播放状态，暂停或播放
    changePlayStatus() {
        let status = this.component.state.status;
        if (status === 'play') {
            status = 'pause';
        } else if (status === 'pause') {
            status = 'play';
        }
        this.component.setState({
            status
        });
    }

    // 修改播放类型，单曲循环或列表循环或随机播放
    changePlayType() {
        let type = this.component.state.type;
        if (type === 'loop') {
            type = 'single-loop';
        } else if (type === 'single-loop') {
            type = 'random';
        } else {
            type = 'loop';
        }
        this.component.setState({
            type
        });
    }

    // 获取歌曲信息
    initMusic() {
        this.component.setState({
            music: this.data.get()
        });
    }

    // 上一曲
    preSong() {
        const type = this.component.state.type;
        let music;
        if (type === 'loop') { // 列表循环
            music = this.data.prev();
        } else if (type === 'single-loop') { // 单曲循环
            music = this.data.get();
        } else { // 随机播放
            music = this.data.random();
        }
        this.component.setState({
            music,
            progress: 0
        });
    }

    // 下一曲
    nextSong() {
        const type = this.component.state.type;
        let music;
        if (type === 'loop') { // 列表循环
            music = this.data.next();
        } else if (type === 'single-loop') { // 单曲循环
            music = this.data.get();
        } else { // 随机播放
            music = this.data.random();
        }
        this.component.setState({
            music,
            progress: 0
        });
    }

    // 关闭音量
    toggleVolume() {
        const volume = this.component.state.volume;
        if (volume !== 0) {
            this.component.setState({
                lastVolume: this.component.state.volume,
                volume: 0
            });
        } else {
            this.component.setState({
                volume: this.component.state.lastVolume,
                lastVolume: this.component.state.volume
            });
        }
    }

    // 切换面板
    toggleListPanel() {
        this.component.setState({
            listVisible: !this.component.state.listVisible
        });
    }

    // 播放指定 id 的音乐
    playSong(id) {
        const music = this.data.getById(id);
        if (music) {
            this.component.setState({
                music,
                status: 'play',
                progress: 0
            });
        }
    }
}
