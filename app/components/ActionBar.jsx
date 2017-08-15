import React from 'react';
import { Button } from 'semantic-ui-react';

function ActionBar() {
    return (
        <Button.Group>
            <Button icon="step backward" />
            <Button icon="play" />
            <Button icon="pause" />
            <Button icon="step forward" />
            <Button icon="shuffle" />
            <Button icon="repeat" />
            <Button icon="lock" />
        </Button.Group>
    );
}

export default ActionBar;
