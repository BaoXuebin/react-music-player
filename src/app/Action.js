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
