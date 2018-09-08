import axios from 'axios'

const getAllNotes = () => dispatch => {
    axios
        .get('http://localhost:4400/notes')
        .then(res => {
            dispatch({
                type: 'GET_ALL_NOTES',
                notes: res.data.notes
            });
        }, e => {
            console.log(e.response.data);
        });
};

const addNote = (noteData) => dispatch => {
    axios
        .post('http://localhost:4400/notes', noteData)
        .then(res => {
            dispatch({
                type: 'ADD_NOTE',
                noteData: res.data.note
            });
        }).catch((e) => {
            console.log(e.response.data);
        });
};

const removeNote = (_id) => dispatch => {
    axios   
        .delete(`http://localhost:4400/notes/${_id}`)
        .then((res) => {
            dispatch({
                type: 'REMOVE_NOTE',
                _id
            })
        })
        .catch((e) => {
            console.log(e.response.data);
        });
};

const editNote = (_id, noteData) => dispatch => {
    axios
        .patch(`http://localhost:4400/notes/${_id}`, noteData)
        .then((res) => {
            dispatch({
                type: 'EDIT_NOTE',
                _id,
                noteData: res.data.note
            });
        }).catch((e) => {
            console.log(e.response.data);
        });
};

export { getAllNotes, addNote, removeNote, editNote }