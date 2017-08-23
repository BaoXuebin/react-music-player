import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Icon } from 'semantic-ui-react';

import '../../style/musiclist.less';

// music 当前选中的音乐
export default class MusicList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.buildItems = this.buildItems.bind(this);
    }

    buildItems() {
        const { currentMusicId, musics } = this.props;
        return musics.map((m) => {
            const current = m.id === currentMusicId;
            return <MusicListItem key={m.id} current={current} music={m} handlePlaySong={this.props.handlePlaySong} />;
        });
    }

    render() {
        return (
            <div className="musiclist-container">
                <Header dividing>
                    <Header.Content>
                        <span className="updateTime">歌单更新于{this.props.receivedAt}</span>
                        <Icon className="refreshBtn" name="refresh" onClick={this.props.handleRefresh} />
                    </Header.Content>
                </Header>
                <List divided relaxed celled animated verticalAlign="middle">
                    {this.buildItems()}
                </List>
            </div>
        );
    }
}

MusicList.propTypes = {
    currentMusicId: PropTypes.string.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        song: PropTypes.string,
        singer: PropTypes.string,
        src: PropTypes.string.isRequired,
        cover: PropTypes.string
    })).isRequired,
    receivedAt: PropTypes.string.isRequired,
    handlePlaySong: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired
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
        id: PropTypes.string.isRequired,
        song: PropTypes.string.isRequired,
        singer: PropTypes.string.isRequired
    }).isRequired,
    handlePlaySong: PropTypes.func.isRequired
};
MusicListItem.defaultProps = {
    current: false
};
