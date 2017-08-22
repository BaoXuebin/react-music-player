import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';

import Data from '../Data';
import '../../style/musiclist.less';

// music 当前选中的音乐
export default class MusicList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.musics = new Data().musics;
        this.buildItems = this.buildItems.bind(this);
    }

    buildItems() {
        return this.musics.map((m) => {
            const current = m.id === this.props.music.id;
            return <MusicListItem key={m.id} current={current} music={m} handlePlaySong={this.props.handlePlaySong} />;
        });
    }

    render() {
        return (
            <div className="musiclist-container">
                <Header dividing>
                    <span className="updateTime">歌单更新于{this.props.updateTime}</span>
                </Header>
                <List divided relaxed celled animated verticalAlign="middle">
                    {this.buildItems()}
                </List>
            </div>
        );
    }
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
