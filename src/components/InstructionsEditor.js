import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';

import Html from 'slate-html-serializer';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
    p: 'paragraph',
    blockquote: 'quote',
    pre: 'code',
    ul: 'bulleted-list',
    ol: 'numbered-list',
    li: 'list-item',
    h3: 'heading-one'
};
// Add a dictionary of mark tags.
const MARK_TAGS = {
    i: 'italic',
    strong: 'bold',
    u: 'underline',
    p: 'paragraph'
};
const DEFAULT_NODE = 'paragraph'
const RULES = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                    },
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            const { object, type, attributes } = obj;
            if (object === 'block') {
                switch (type) {
                    case BLOCK_TAGS.blockquote:
                        return <blockquote {...attributes}>{children}</blockquote>
                    case BLOCK_TAGS.ul:
                        return <ul {...attributes}>{children}</ul>
                    case BLOCK_TAGS.h3:
                        return <h3 {...attributes}>{children}</h3>
                    case BLOCK_TAGS.li:
                        return <li {...attributes}>{children}</li>
                    case BLOCK_TAGS.ol:
                        return <ol {...attributes}>{children}</ol>
                    case BLOCK_TAGS.p:
                    default:
                        return <p {...attributes}>{children}</p>
                }
            }
        },
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object === 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>
                    case 'italic':
                        return <i>{children}</i>
                    case 'underline':
                        return <u>{children}</u>
                    default:
                        return <span>{children}</span>
                }
            }
        },
    },
];

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules: RULES });

class InstructionsEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: html.deserialize(props.value || '<p></p>')
        };
    }

    hasBlock(type) {
        const { value } = this.state
        return value.blocks.some(node => node.type === type)
    }
    onChange = ({ value }) => {
        if (value.document !== this.state.value.document) {
            const string = html.serialize(value);

            const { handleOnChange } = this.props;
            handleOnChange(string);
        }

        this.setState({ value });
    }
    onClickMark = (e, type) => {
        e.preventDefault();

        const { value } = this.state;
        const change = value.change().toggleMark(type);

        this.onChange(change);
    }
    onClickBlock = (event, type) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change()
        const { document } = value

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                change
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                change.setBlocks('list-item').wrapBlock(type)
            }
        }

        this.onChange(change)
    }

    renderNode(props) {
        const { attributes, children, node } = props

        switch (node.type) {
            case BLOCK_TAGS.blockquote:
                return <blockquote {...attributes}>{children}</blockquote>
            case BLOCK_TAGS.ul:
                return <ul {...attributes}>{children}</ul>
            case BLOCK_TAGS.h3:
                return <h3 {...attributes}>{children}</h3>
            case BLOCK_TAGS.li:
                return <li {...attributes}>{children}</li>
            case BLOCK_TAGS.ol:
                return <ol {...attributes}>{children}</ol>
            case BLOCK_TAGS.p:
            default:
                return <p {...attributes}>{children}</p>
        }
    }

    renderMark(props) {
        const { children, mark } = props
        switch (mark.type) {
            case MARK_TAGS.strong:
                return <strong {...props}>{children}</strong>
            case MARK_TAGS.i:
                return <i {...props}>{children}</i>
            case MARK_TAGS.strong.u:
                return <u {...props}>{children}</u>
            default:
                return <span {...props}>{children}</span>
        }
    }

    // Render the editor.
    render() {
        return (
            <Fragment>
                <div className="toolbar">
                    {/* turn these into objects and use tags*/}
                    <button type="button" onPointerDown={(e) => this.onClickMark(e, 'bold')}><FontAwesomeIcon icon="bold" /></button>
                    <button type="button" onPointerDown={(e) => this.onClickMark(e, 'italic')}><FontAwesomeIcon icon="italic" /></button>
                    <button type="button" onPointerDown={(e) => this.onClickMark(e, 'underline')}><FontAwesomeIcon icon="underline" /></button>
                    <button type="button" onPointerDown={(e) => this.onClickBlock(e, 'bulleted-list')}><FontAwesomeIcon icon="list-ul" /></button>
                    <button type="button" onPointerDown={(e) => this.onClickBlock(e, 'numbered-list')}><FontAwesomeIcon icon="list-ol" /></button>
                    <button type="button" onPointerDown={(e) => this.onClickBlock(e, 'heading-one')}><FontAwesomeIcon icon="heading" /></button>
                </div>
                <Editor className="editor" value={this.state.value} onChange={this.onChange} renderMark={this.renderMark} renderNode={this.renderNode} />
            </Fragment>);
    }
}

export default InstructionsEditor;