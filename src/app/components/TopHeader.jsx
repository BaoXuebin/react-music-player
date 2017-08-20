import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import '../../style/header.less';

function TopHeader() {
    return (
        <div className="component-header">
            <Header as="h2">
                <Icon name="music" color="red" />
                <Header.Content>
                    Music
                </Header.Content>
            </Header>
        </div>
    );
}

export default TopHeader;
