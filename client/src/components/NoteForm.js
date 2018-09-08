import React from 'react';
import classnames from 'classnames';

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onNoteFormSubmit = this.onNoteFormSubmit.bind(this);
        this.state = {
            title: props.oldNote ? props.oldNote.title : '',
            note: props.oldNote ? props.oldNote.note : '',
            errors: {}
        };
    };

    onTitleChange(e) {
        let title = e.target.value;
        if (title.match(/^(.{0,70})$/)) {
            this.setState(() => ({
                title,
                errors: {}
            }));
        } else {
            this.setState(() => ({ errors: { title: 'Title Cannot Be More Than 70 Characters' } }));
        }
    };

    onNoteChange(e) {
        let note = e.target.value;
        if (note.match(/^(.{0,200})$/)) {
            this.setState(() => ({
                note,
                errors: {}
            }));
        } else {
            this.setState(() => ({ errors: { note: 'Note Cannot Be More Than 200 Characters' } }));
        }
    };

    onNoteFormSubmit(e) {
        e.preventDefault();
        if (!this.state.title) {
            this.setState(() => ({
                errors: { title: 'Please Enter Title' }
            }));
            return;
        }
        if (!this.state.note) {
            this.setState(() => ({
                errors: { note: 'Please Enter The Body' }
            }));
            return;
        }

        this.props.onSubmit({
            title: this.state.title,
            note: this.state.note
        });
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">{this.props.formName}</div>
                <div className="card-body">
                    <form onSubmit={this.onNoteFormSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Title"
                                className={classnames('form-control', {
                                    'is-invalid': this.state.errors.title
                                })}
                                value={this.state.title}
                                onChange={this.onTitleChange}
                            />
                            <div className="invalid-feedback">
                                {this.state.errors.title}
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Note"
                                className={classnames('form-control', {
                                    'is-invalid': this.state.errors.note
                                })}
                                value={this.state.note}
                                onChange={this.onNoteChange}
                            >
                            </textarea>
                            <div className="invalid-feedback">
                                {this.state.errors.note}
                            </div>
                        </div>
                        <button className="btn btn-dark">{this.props.formName}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteForm;