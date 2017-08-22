import {
    PLAY, PAUSE, LAST_SONG, NEXT_SONG, CHANGE_PROGRESS,
    CHANGE_VOLUME, OPEN_MUTE, CLOSE_MUTE, CHANGE_PLAY_TYPE
} from '../action/action';

function actionReducers(state = {
    currentMusicId: '',
    progress: 0,
    volume: 0.5,
    status: 'pause',
    playType: 'loop',
    mute: false
}, action) {
    switch (action.type) {
        case PLAY: // 播放
        case PAUSE: // 暂停
            return Object.assign({}, state, { status: action.status });
        case CHANGE_PLAY_TYPE: // 修改轮播类型
            return Object.assign({}, state, { playType: action.playType });
        case CHANGE_PROGRESS: // 修改播放进度
            return Object.assign({}, state, { progress: action.progress });
        case CHANGE_VOLUME:
            return Object.assign({}, state, { volume: action.volume });
        case OPEN_MUTE: // 打开静音
        case CLOSE_MUTE: // 关闭静音
            return Object.assign({}, state, { mute: action.mute });
        default:
            return state;
    }
}

export default actionReducers;
// export default combineReducers({
//     togglePlay, lastOrNextSong, changeProgress, changeVolume, openOrCloseMute
// });
