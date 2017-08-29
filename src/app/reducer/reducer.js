import {
    PLAY, PAUSE, LOADING, PLAY_SPECIFIED_SONG, CHANGE_PROGRESS, INIT_PLAYER,
    CHANGE_VOLUME, OPEN_MUTE, CLOSE_MUTE, CHANGE_PLAY_TYPE,
    REQUEST_MUSICS, RECEIVE_MUSICS, OPEN_SLIDEBAR, CLOSE_SLIDEBAR,
    GET_MUSIC_DURATION, CHANGE_WINDOW_SIZE
} from '../action/action';

function actionReducers(state = {
    ifReady: false,
    currentMusicId: '',
    progress: 0,
    volume: 0.5,
    status: 'pause',
    playType: 'loop',
    mute: false,
    loading: false,
    listVisible: false,
    musics: [],
    receivedAt: '2017-08-23 00:00:00'
}, action) {
    switch (action.type) {
        case INIT_PLAYER:
            return Object.assign({}, state, { ifReady: false });
        case PLAY: // 播放
        case PAUSE: // 暂停
        case LOADING: // 加载中
            return Object.assign({}, state, { status: action.status });
        case CHANGE_PLAY_TYPE: // 修改轮播类型
            return Object.assign({}, state, { playType: action.playType });
        case CHANGE_PROGRESS: // 修改播放进度
            return Object.assign({}, state, { progress: action.progress });
        case CHANGE_VOLUME: // 调节音量
            return Object.assign({}, state, { volume: action.volume });
        case OPEN_MUTE: // 打开静音
        case CLOSE_MUTE: // 关闭静音
            return Object.assign({}, state, { mute: action.mute });
        case PLAY_SPECIFIED_SONG:
            return Object.assign({}, state, {
                currentMusicId: action.currentMusicId,
                progress: action.progress,
                status: action.status
            });
        case REQUEST_MUSICS:
            return Object.assign({}, state, { loading: action.loading });
        case RECEIVE_MUSICS:
            return Object.assign({}, state, {
                loading: action.loading,
                musics: action.musics,
                receivedAt: action.receivedAt,
                ifReady: true,
                currentMusicId: action.currentMusicId
            });
        case OPEN_SLIDEBAR:
        case CLOSE_SLIDEBAR:
            return Object.assign({}, state, { listVisible: action.listVisible });
        case GET_MUSIC_DURATION:
            return Object.assign({}, state, { duration: action.duration });
        case CHANGE_WINDOW_SIZE:
            return Object.assign({}, state, { width: action.width, height: action.width });
        default:
            return state;
    }
}

export default actionReducers;
// export default combineReducers({
//     togglePlay, lastOrNextSong, changeProgress, changeVolume, openOrCloseMute
// });
