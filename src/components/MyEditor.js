import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, CompositeDecorator } from 'draft-js';
import Toolbar from './Toolbar';
import Link from './Link';

import 'draft-js/dist/Draft.css';
import './MyEditor.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            readOnly: false
        };
        this.onChange = editorState => this.setState({ editorState });
        this.focus = () => this.refs.editor.focus();
    }

    toggleInlineStyle = inlineStyle => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    }

    toggleReadOnly = () => {
        this.setState({
            readOnly: !this.state.readOnly
        })
    }

    contentConvertToRaw = () => {
        console.log(
            convertToRaw(this.state.editorState.getCurrentContent())
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

    // 给选中的文字加上默认的链接 www.github.com
    addLink = (e) => {
        e.preventDefault();
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();

        const url = 'https://www.github.com';
        // 在 ContentState 中创建一个 LINK entity
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url }
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity
        });

        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            )
        });
    }

    render() {
        const { editorState } = this.state;
        let className = 'Editor-editor';

        return (
            <div className="Editor-root">
                <button onClick={this.toggleReadOnly} className="debug-button">
                    Toggle Read Only
                </button>
                <button onClick={this.contentConvertToRaw} className="debug-button">
                    convertToRaw
                </button>

                <Toolbar 
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                    addLink={this.addLink}
                />
                <div className={className}>
                    <Editor
                        editorState={editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        placeholder="Say something..."
                        ref="editor"
                        readOnly={this.state.readOnly}
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor;
