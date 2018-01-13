import React from 'react';

const Link = props => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <a href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    )
}

export default Link;
