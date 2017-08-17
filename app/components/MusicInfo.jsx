import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';
import Utils from '../Utils';

function MusicInfo({ music }) {
    const song = music.song;
    const singer = music.singer;
    const time = music.time;
    return (
        <div>
            <Header size="small">{song}</Header>
            <p><Icon name="user" />{singer}</p>
            <p><Icon name="time" />{Utils.parseTime(time)}</p>
        </div>
    );
}

MusicInfo.propTypes = {
    music: PropTypes.shape({
        song: PropTypes.string,
        singer: PropTypes.string,
        time: PropTypes.int
    })
};
MusicInfo.defaultProps = {
    music: {
        song: '未知',
        singer: '未知歌手',
        time: '0'
    }
};
export default MusicInfo;