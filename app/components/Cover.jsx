import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import DefaultCover from '../../src/image/logo.png';

// 封面图片
function Cover({ image }) {
    const coverImg = image;
    return (
        <Image src={coverImg} size="small" shape="circular" />
    );
}

Cover.propTypes = {
    image: PropTypes.string
};
Cover.defaultProps = {
    image: DefaultCover
};

export default Cover;
