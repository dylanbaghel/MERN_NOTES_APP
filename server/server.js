require('./config/config');

//THIRD PARTY MODULES
const express = require('express');
const app = express();
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const cors = require('cors');
const path = require('path');

//CUSTOM MODULE FILES
const { mongoose } = require('./db/mongoose');
const { Note } = require('./models/note');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
//MIDDLEWARES
app.use(express.json());
app.use(cors());


//ROUTES

//Notes - Routes
//POST - /notes - CREATE NEW NOTE
app.post('/notes', authenticate, (req, res) => {
    const body = _.pick(req.body, ['title', 'note']);

    let note = new Note({
        ...body,
        _creator: req.user._id
    });
    note.save().then((note) => {
        res.status(200).send({ note });
    }).catch((e) => {
        res.status(400).send();
    });
});

//GET - /notes - GET ALL NOTED
app.get('/notes', authenticate, (req, res) => {
    Note.find({
        _creator: req.user._id
    }).then((notes) => {
        res.status(200).send({ notes });
    }).catch((e) => {
        res.status(400).send();
    });
});

//GET - /notes/:id - GET INDIVIDUAL NOTE
app.get('/notes/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Note.findOne({
        _id: id,
        _creator: req.user._id
    }).then((note) => {
        if (!note) {
            return res.status(404).send('Note Not Found');
        }

        res.status(200).send({ note });
    }).catch((e) => {
        res.status(400).send();
    })
});

//DELETE - /notes/:id - DELETE PARTICULAR NOTE
app.delete('/notes/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }

    Note.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((note) => {
        if (!note) {
            return res.status(404).send('Note Not Found');
        }
        res.status(200).send({ note });
    }).catch((e) => {
        res.status(400).send();
    });
});

//PATCH - /notes/:id - PATCH THE NOTE
app.patch('/notes/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['title', 'note']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Note.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((note) => {
        if (!note) {
            return res.status(404).send('Note Note Found');
        }

        res.status(200).send({ note });
    }).catch((e) => {
        res.status(400).send();
    });
});

//User - Routes
//POST - /users - CREATE NEW USER
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (user) {
            return res.status(400).send({ email: 'User Already Exist' });
        }

        let newUser = new User(body);

        newUser.save().then(() => {
            return newUser.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send({ token });
        }).catch((e) => {
            res.status(400).send(e);
        });
    })
});

//POST - /users/login - LOGIN A USER
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            return res.status(400).send({ email: 'No User Registered With This Email' });
        } else {
            User.findByCredentials(body.email, body.password).then((user) => {
                return user.generateAuthToken().then((token) => {
                    res.header('x-auth', token).send({ token });
                });
            }).catch((e) => {
                res.status(400).send({ password: 'Password Incorrect' });
            });
        }
    })
});

//GET - /users/me - GET LOGGED IN USER
app.get('/users/me', authenticate, (req, res) => {
    res.status(200).send(req.user);
});

//DELETE - /users/me/token - LOGGED OUT USER
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    })
});


//SERVE STATIC REACT FILES IF IN PRODUCTION 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

//LISTEN
app.listen(process.env.PORT, () => {
    console.log('Server At ', process.env.PORT);
});