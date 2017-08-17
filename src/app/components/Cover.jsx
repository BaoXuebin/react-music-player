import React from 'react';
import PropTypes from 'prop-types';
import DefaultCover from '../../image/logo.png';

// 封面图片
function Cover({ image }) {
    const coverImg = image;
    return (
        <img src={coverImg} className="cover" alt="封面" />
    );
}

Cover.propTypes = {
    image: PropTypes.string
};
Cover.defaultProps = {
    image: DefaultCover
};

export default Cover;
