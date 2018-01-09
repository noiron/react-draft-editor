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
        this.focus = () => this.refs.editor.focus();
    }

    toggleInlineStyle = inlineStyle => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
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
                        handleKeyCommand={this.handleKeyCommand}
                        placeholder="Say something..."
                        ref="editor"
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor;
