import React, { useEffect, useRef, useState } from 'react';

const GrowingTextArea = (props) => {
    const textareaRef = useRef(null);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";           // Reset height to auto
            const newHeight = textareaRef.current.scrollHeight;  // Get the actual height
            textareaRef.current.style.height = `${newHeight}px`; // Apply the height
            console.log(newHeight);
        }
    };
    
    useEffect(() => {
        adjustHeight();
    }, []);

    // rows: Specifies the default height in average character heights. Defaults to 2.
    return (
        <textarea
            ref={textareaRef}
            rows="1"
            onInput={() => adjustHeight()}
            {...props}>
            
        </textarea>
    );
}

export default GrowingTextArea;
