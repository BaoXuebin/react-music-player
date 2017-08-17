import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

function TopHeader() {
    return (
        <Segment>
            <Header as="h2">
                <Icon name="music" color="red" />
                <Header.Content>
                    Music
                </Header.Content>
            </Header>
        </Segment>
    );
}

export default TopHeader;
