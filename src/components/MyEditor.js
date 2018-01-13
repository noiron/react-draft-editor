import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, CompositeDecorator } from 'draft-js';
import Toolbar from './Toolbar';
import Link from './Link';
import Dialog from 'rc-dialog';
import 'rc-dialog/dist/rc-dialog.css';

import 'draft-js/dist/Draft.css';
import './MyEditor.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link
            }
        ]);

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            readOnly: false,
            openModal: false,
            linkUrl: '',
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

    // 给选中的文字加上链接
    _addLink = (url) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();

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
            ),
            linkUrl: ''
        });
    }

    handleLinkButton = (e) => {
        e.preventDefault();
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({ openModal: !this.state.openModal });
    }

    changeLinkUrl = () => {
        const url = this.refs.urlInput.value;   // 输入的URL地址
        this.setState({ linkUrl: url });
        this._addLink(url);
        this.toggleModal();
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
                {/* <button className="debug-button" onClick={this.toggleModal}>
                    Open Modal
                </button> */}

                <Toolbar 
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                    addLink={this.handleLinkButton}
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

                <Dialog title={'插入链接'} onClose={this.toggleModal} 
                    visible={this.state.openModal}
                    className="add-link-dialog"
                >
                    <p className="get-info">
                        <label htmlFor="link-text-input">请输入显示文本：</label>
                        <input id="link-text-input" ref="linkTextInput"></input>
                    </p>
                    <p className="get-info">
                    <label htmlFor="url-input">请输入链接：</label>
                        <input id="url-input" ref="urlInput" defaultValue="https://"></input>
                    </p>
                    <div className="buttons">
                    <button onClick={this.changeLinkUrl}>确定</button>
                    <button onClick={this.toggleModal}>取消</button>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default MyEditor;

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
}
