import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { List, Header } from 'semantic-ui-react';

import Data from '../Data';
import '../../style/musiclist.less';

const musics = new Data().musics;

// music 当前选中的音乐
export default function MusicList({ music, handlePlaySong, updateTime }) {
    const itemHtml = musics.map((m) => {
        const current = m.id === music.id;
        return <MusicListItem key={uuid.v4()} current={current} music={m} handlePlaySong={handlePlaySong} />;
    });
    return (
        <div className="musiclist-container">
            <Header dividing>
                <span className="updateTime">歌单更新于{updateTime}</span>
            </Header>
            <List divided relaxed animated celled verticalAlign="middle">
                {itemHtml}
            </List>
        </div>
    );
}

MusicList.propTypes = {
    music: PropTypes.shape({
        id: PropTypes.number.isRequired,
        song: PropTypes.string.isRequired,
        singer: PropTypes.string.isRequired
    }).isRequired,
    handlePlaySong: PropTypes.func.isRequired,
    updateTime: PropTypes.string
};
MusicList.defaultProps = {
    updateTime: '2017-08-20 23:55:18'
};

function MusicListItem({ current, music, handlePlaySong }) {
    const playSong = () => {
        if (music) {
            handlePlaySong(music.id);
        } else {
            handlePlaySong(1);
        }
    };
    const className = current ? 'current' : '';
    return (
        <List.Item className={className} onClick={playSong}>
            <List.Content as="span">{music.song}</List.Content>
            <List.Content floated="right">{music.singer}</List.Content>
        </List.Item>
    );
}

MusicListItem.propTypes = {
    current: PropTypes.bool,
    music: PropTypes.shape({
        id: PropTypes.number.isRequired,
        song: PropTypes.string.isRequired,
        singer: PropTypes.string.isRequired
    }).isRequired,
    handlePlaySong: PropTypes.func.isRequired
};
MusicListItem.defaultProps = {
    current: false
};
