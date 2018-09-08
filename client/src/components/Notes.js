import React from 'react';
import { getAllNotes } from './../actions/notes';
import { connect } from 'react-redux';
import Note from './Note';
import { isEmpty } from './../validation/isEmpty';

class Notes extends React.Component {

    componentDidMount() {
        const isAuthenticated = this.props.auth.isAuthenticated;
        if (!isAuthenticated) {
            this.props.history.push('/login');
            return null;
        }

        this.props.dispatch(getAllNotes());
    }

    render() {
        return (
            <div className="container">
                {
                    !isEmpty(this.props.notes) ?
                        
                            this.props.notes.map((note) => {
                                return <Note
                                    key={note._id}
                                    note={note}
                                />
                            })
                         :
                        <h2>No Notes Created</h2>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        notes: state.notes
    };
};

export default connect(mapStateToProps)(Notes);