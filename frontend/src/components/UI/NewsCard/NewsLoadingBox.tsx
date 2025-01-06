import React from 'react';
import './NewsLoadingBox.scss';

const NewsLoadingBox: React.FC = () => {
    return (
        <div className="news-loading-box">
            <div className="news-loading-box__image"></div>
            <div className="news-loading-box__content">
                <div className="news-loading-box__title"></div>
                <div className="news-loading-box__category"></div>
                <div className="news-loading-box__text"></div>
            </div>
        </div>
    );
};

export default NewsLoadingBox;
