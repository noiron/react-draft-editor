import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Toolbar from './Toolbar';

import 'draft-js/dist/Draft.css';
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
        const { editorState } = this.state;
        let className = 'Editor-editor';

        return (
            <div className="Editor-root">
                <Toolbar 
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className}>
                    <Editor
                        editorState={editorState}
                        onChange={this.onChange}
                        placeholder="Say something..."
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor;
