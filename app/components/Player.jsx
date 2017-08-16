import React from 'react';
import { Container, Progress } from 'semantic-ui-react';

import Cover from './Cover';
import ActionBar from './ActionBar';
import MusicInfo from './MusicInfo';
// import DefaultCover from '../../src/image/logo.png';
import CDCover1 from '../../src/image/cd2.jpeg';
import MusicSource from '../../src/audio/山阴路的夏天.mp3';
import '../../src/style/player.less';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pause',
            type: 'loop'
        };
        this.playOrPause = this.playOrPause.bind(this);
        this.changePlayType = this.changePlayType.bind(this);
    }

    playOrPause() {
        let status = this.state.status;
        if (status === 'play') {
            status = 'pause';
        } else if (status === 'pause') {
            status = 'play';
        }
        this.setState({
            status
        });
    }

    changePlayType() {
        let type = this.state.type;
        if (type === 'loop') {
            type = 'single-loop';
        } else if (type === 'single-loop') {
            type = 'random';
        } else if (type === 'random') {
            type = 'loop';
        }
        this.setState({
            type
        });
    }

    render() {
        const music = {
            song: '山阴路的夏天',
            singer: '李志',
            time: '2:34'
        };
        // <audio src={MusicSource} autoPlay="autoplay">
        //     <track kind="captions" />
        // </audio>
        // 当前播放器的状态，暂停或播放
        const playStatus = this.state.status;
        const playType = this.state.type;
        return (
            <Container textAlign="center" fluid className="player-container" >
                <Cover image={CDCover1} />
                <MusicInfo music={music} />
                <Progress percent={10} size="tiny" color="red" />
                <ActionBar
                    status={playStatus}
                    type={playType}
                    handlePlayOrPause={this.playOrPause}
                    handleChangePlayType={this.changePlayType}
                />
            </Container>
        );
    }
}

export default Player;
