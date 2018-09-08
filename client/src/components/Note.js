import React from 'react';
import { connect } from 'react-redux';
import { removeNote } from './../actions/notes';
import { Link } from 'react-router-dom';

const Note = (props) => {
    return (
        <div className="card mb-2">
            <div className="card-header">{props.note.title}</div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <p className="mr-3">{props.note.note}</p>
                    <div className="d-flex justify-content-around">
                        <Link 
                            className="btn btn-dark mr-2" 
                            to={`/notes/edit/${props.note._id}`}
                            >Edit</Link>
                        <button className="btn btn-danger ml-2" onClick={() => {
                            props.dispatch(removeNote(props.note._id));
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(Note);