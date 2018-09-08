const noteReducerDefaultState = [];

const noteReducer = (state = noteReducerDefaultState, action) => {
    switch(action.type) {
        case 'GET_ALL_NOTES':
            return action.notes;
        case 'ADD_NOTE':
            return [
                action.noteData,
                ...state
            ];
        case 'REMOVE_NOTE':
            return state.filter((note) => {
                return note._id !== action._id
            });
        case 'EDIT_NOTE':
            return state.map((note) => {
                if (note._id !== action._id) {
                    return note;
                }

                return {
                    ...note,
                    ...action.noteData
                };
            });
        default:
            return state;
    }
};

export default noteReducer;