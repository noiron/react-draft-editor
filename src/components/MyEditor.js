import React from 'react';
import { Editor, EditorState } from 'draft-js';

import './MyEditor.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = editorState => this.setState({ editorState });
    }

    render() {
        return (
            <div className="Editor-root">
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
