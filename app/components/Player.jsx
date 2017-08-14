import React from 'react';
import { Container, Image, Button, Header, Icon, Progress } from 'semantic-ui-react';
import Logo from '../../src/image/logo.png';

function Player() {
    return (
        <Container>
            <Image src={Logo} size="small" shape="circular" />
            <Header size="small">山阴路的夏天</Header>
            <p><Icon name="user" />李志</p>
            <p><Icon name="time" />-2:31</p>
            <Progress percent={10} size="tiny" color="red" />
            <Button.Group>
                <Button icon="step backward" />
                <Button icon="play" />
                <Button icon="pause" />
                <Button icon="step forward" />
                <Button icon="shuffle" />
                <Button icon="repeat" />
                <Button icon="lock" />
            </Button.Group>
        </Container>
    );
}

export default Player;
