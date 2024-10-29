import React from 'react';

const LeftNavButton = ({isActive, onClick, children}) => {
    let className = 'left-nav__btn';
    if (isActive) {
        className = 'left-nav__btn left-nav__btn__active';
    }
    
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
}

export default LeftNavButton;
