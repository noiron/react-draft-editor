import React from 'react';

const label = 'Link';

const LinkButton = (props) => {
    return (
        <span className="Editor-actionButton" onMouseDown={props.addLink || null}>
            {label}
        </span>
    )
}

export default LinkButton;
