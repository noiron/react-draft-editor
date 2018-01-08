import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Toolbar from './Toolbar';

import './MyEditor.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = editorState => this.setState({ editorState });
    }

    toggleInlineStyle = inlineStyle => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    }

    render() {
        return (
            <div className="Editor-root">
                <Toolbar 
                    editorState={this.state.editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder="Say something..."
                />
            </div>
        );
    }
}

export default MyEditor;
