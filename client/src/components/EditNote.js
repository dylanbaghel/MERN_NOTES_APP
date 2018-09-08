import React from 'react';
import { connect } from 'react-redux';
import NoteForm from './NoteForm';
import { editNote } from './../actions/notes';

const EditNote = (props) => {
    const isAuthenticated = props.auth.isAuthenticated;
    if (!isAuthenticated) {
        props.history.push('/login');
        return null;
    } else  {
        if (props.note === undefined) {
            props.history.push('/notes');
            return null;
        }
    }
    return(
        <div className="container">
           <NoteForm 
            formName="Edit Note"
            oldNote={props.note}
            onSubmit={(noteData) => {
                props.dispatch(editNote(props.note._id, noteData));
                props.history.push('/notes');
            }}
           />
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return{
        auth: state.auth,
        note: state.notes.find((note) => {
            return note._id === props.match.params.id
        })
    };
};

export default connect(mapStateToProps)(EditNote);