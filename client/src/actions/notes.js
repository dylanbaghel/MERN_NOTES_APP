import axios from 'axios'

const getAllNotes = () => dispatch => {
    axios
        .get('https://mern-notes-app.herokuapp.com/notes')
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
        .post('https://mern-notes-app.herokuapp.com/notes', noteData)
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
        .delete(`https://mern-notes-app.herokuapp.com/notes/${_id}`)
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
        .patch(`https://mern-notes-app.herokuapp.com/notes/${_id}`, noteData)
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