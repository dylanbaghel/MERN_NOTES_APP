import React from 'react';
import NoteForm from './NoteForm';
import { connect } from 'react-redux';
import { addNote } from './../actions/notes';

const AddNote = (props) => {
    const isAuthenticated = props.auth.isAuthenticated
    if (!isAuthenticated) {
        props.history.push('/login');
        return null;
    }
    return(
        <div className="container">
            <NoteForm 
                formName="Add Note"
                onSubmit={(noteData) => {
                    props.dispatch(addNote(noteData));
                    props.history.push('/notes');
                }}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(AddNote);