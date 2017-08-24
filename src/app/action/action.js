import fetch from 'isomorphic-fetch';
import moment from 'moment';

export const INIT_PLAYER = 'INIT_PLAYER';
export const PLAY = 'PLAY';
export const LOADING = 'LOADING';
export const PAUSE = 'PAUSE';
export const CHANGE_PLAY_TYPE = 'CHANGE_PLAY_TYPE';
export const PLAY_SPECIFIED_SONG = 'PLAY_SPECIFIED_SONG';
export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const CLOSE_MUTE = 'CLOSE_MUTE';
export const OPEN_MUTE = 'OPEN_MUTE';
// 异步操作
export const REQUEST_MUSICS = 'REQUEST_MUSICS';
export const RECEIVE_MUSICS = 'RECEIVE_MUSICS';
// const URL = 'http://xdbin.com/music';
const URL = 'http://localhost:8080/selfworld/music';
// 切换侧栏的显示状态
export const OPEN_SLIDEBAR = 'OPEN_SLIDEBAR';
export const CLOSE_SLIDEBAR = 'CLOSE_SLIDEBAR';
export const GET_MUSIC_DURATION = 'GET_MUSIC_DURATION';

// 初始化播放器
export function initPlayer() {
    return {
        type: INIT_PLAYER
    };
}

// 歌曲歌曲长度
export function getMusicDuration(duration) {
    return {
        type: GET_MUSIC_DURATION,
        duration
    };
}

// 播放音乐
export function play() {
    return {
        type: PLAY,
        status: 'play'
    };
}
export function loading() {
    return {
        type: LOADING,
        status: 'loading'
    };
}
// 暂停音乐
export function pause() {
    return {
        type: PAUSE,
        status: 'pause'
    };
}
// 改变轮播类型
export function changePlayType(playType) {
    return {
        type: CHANGE_PLAY_TYPE,
        playType
    };
}
// 切换指定歌曲
export function playSpecifiedSong(currentMusicId) {
    return {
        type: PLAY_SPECIFIED_SONG,
        currentMusicId,
        progress: 0,
        status: 'play'
    };
}
// 调节播放进度
export function changeProgress(progress) {
    return {
        type: CHANGE_PROGRESS,
        progress
    };
}
// 调节音量
export function changeVolume(volume) {
    return {
        type: CHANGE_VOLUME,
        volume
    };
}
// 关闭静音
export function closeMute() {
    return {
        type: CLOSE_MUTE,
        mute: false
    };
}
// 打开静音
export function openMute() {
    return {
        type: OPEN_MUTE,
        mute: true
    };
}

export function toggleSlideBar(visible) {
    if (visible) {
        return {
            type: CLOSE_SLIDEBAR,
            listVisible: false
        };
    }
    return {
        type: OPEN_SLIDEBAR,
        listVisible: true
    };
}

function requestMusics() {
    return {
        type: 'REQUEST_MUSICS',
        loading: true
    };
}

function receiveMusics(musics, currentMusicId) {
    let musicId = currentMusicId;
    if (!musicId || musicId === '') {
        musicId = musics[0].id;
    }
    return {
        type: RECEIVE_MUSICS,
        musics,
        currentMusicId: musicId,
        loading: false,
        receivedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        ifReady: true
    };
}

// 请求音乐列表
function fetchMusics(currentMusicId) {
    return (dispatch) => {
        dispatch(requestMusics());
        return fetch(URL)
            .then(response => response.json())
            .then(json => dispatch(receiveMusics(json, currentMusicId)));
    };
}

export function fetchMusicsIfNeeded() {
    return (dispatch, getState) => {
        const l = getState().loading;
        const currentMusicId = getState().currentMusicId;
        if (!l) {
            return dispatch(fetchMusics(currentMusicId));
        }
        return false;
    };
}
