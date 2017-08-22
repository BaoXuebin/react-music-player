export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const CHANGE_PLAY_TYPE = 'CHANGE_PLAY_TYPE';
export const LAST_SONG = 'LAST_SONG';
export const NEXT_SONG = 'NEXT_SONG';
export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const CLOSE_MUTE = 'CLOSE_MUTE';
export const OPEN_MUTE = 'OPEN_MUTE';

// 播放音乐
export function play() {
    return {
        type: PLAY,
        status: 'play'
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
// 上一曲
export function lastSong(currentMusicId) {
    return {
        type: LAST_SONG,
        currentMusicId
    };
}
// 下一曲
export function nextSong(currentMusicId) {
    return {
        type: NEXT_SONG,
        currentMusicId
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
