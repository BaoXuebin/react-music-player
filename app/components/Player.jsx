import React from 'react';
import { Container, Progress } from 'semantic-ui-react';
import Cover from './Cover';
import ActionBar from './ActionBar';
import MusicInfo from './MusicInfo';
import DefaultCover from '../../src/image/logo.png';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay() {
        this.props = '';
    }

    render() {
        const music = {
            song: '山阴路的夏天',
            singer: '李志',
            time: '2:34'
        };
        return (
            <Container>
                <Cover image={DefaultCover} />
                <MusicInfo music={music} />
                <Progress percent={10} size="tiny" color="red" />
                <ActionBar />
            </Container>
        );
    }
}

export default Player;
