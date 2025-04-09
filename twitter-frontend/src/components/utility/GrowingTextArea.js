import React, { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const GrowingTextArea = (props) => {
    const textareaRef = useRef(null);
    const windowDimensions = useWindowDimensions();
    const {maxHeightFn, content, setContent, ...propsRest} = props;

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";           // Reset height to auto
            const maxHeight = maxHeightFn(windowDimensions);
            let newHeight = textareaRef.current.scrollHeight;  // Get the actual height
            if (maxHeight < newHeight) {
                newHeight = maxHeight;
            }
            textareaRef.current.style.height = `${newHeight}px`; // Apply the height
        }
    };
    
    useEffect(() => {
        adjustHeight();
    }, [windowDimensions, content]);

    // 1) rows: Specifies the default height in average character heights. Defaults to 2.
    // 2) onInput={() => adjustHeight()} not needed because of useEffect with content
    return (
        <textarea
            ref={textareaRef}
            rows="1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            {...propsRest}>
            
        </textarea>
    );
}

export default GrowingTextArea;
