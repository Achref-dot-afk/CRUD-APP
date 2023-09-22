const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const user = require('./public/models/user');
require('./public/js/connect');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async(_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});
app.get('/users', async(_, res) => {
    const NewUser = mongoose.model('User', user);
    const users = await NewUser.find({});
    res.send(users);
});

app.post('/',(req, res) => {
    const NewUser = mongoose.model('User', user);
    const newUser = new NewUser({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });
    newUser.save().then(() => {
        res.send(newUser);
    }).catch((err) => {
        console.log(err);
    });
});

app.put("/", async (req, res) => {
    const { UpdatedUser, targetUserData } = req.body;
    try {
        
        const User = mongoose.model('User', user);
        
    
        const ChangeUser = await User.findOneAndUpdate(
            targetUserData, 
            UpdatedUser, 
        );

        if (ChangeUser) {
            res.status(200).send(UpdatedUser);
        } 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.delete("/", async (req, res) => {
    let User = mongoose.model('User', user);
    const target = await User.find({name : req.body.name , email : req.body.email , phone : req.body.phone});
    if(target.length > 0){
        target.forEach(async (user) => {
            await User.deleteOne(user);
        });
        res.status(200).send('User deleted');
    }
});





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
