import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container } from 'semantic-ui-react';

import DefaultCover from '../../image/logo.png';
import '../../style/info.less';

/*
 * 显示歌曲的封面信息，歌手等信息
 */
class Info extends React.PureComponent {
    render() {
        const { music, coverRotate } = this.props;
        return (
            <Container textAlign="center" className="info-container" >
                <img
                    src={music.cover || DefaultCover}
                    className={coverRotate ? '' : 'pause'}
                    alt="封面"
                    role="presentation"
                />
                <div>
                    <Header size="medium">{music.song}</Header>
                    <p>{music.singer}</p>
                </div>
            </Container>
        );
    }
}

Info.propTypes = {
    music: PropTypes.shape({
        song: PropTypes.string,
        singer: PropTypes.string,
        cover: PropTypes.string
    }),
    coverRotate: PropTypes.bool
};
Info.defaultProps = {
    music: {
        song: '未知歌曲',
        singer: '未知歌手',
        cover: DefaultCover
    },
    coverRotate: false
};

export default Info;
