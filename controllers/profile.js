const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db
        .select('*').from('users')
        .where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found');
            }
        });
}

const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params
    const { name } = req.body.formInput
    db('users')
        .where({ id })
        .update({ name: name })
        .then(resp => {
        if (resp) {
            res.json("success")
        } else {
            res.status(400).json('Not found')
        }
        })
        .catch(err => res.status(400).json('error updating user'))
}

const getScoreBoard = (req, res, db) => {
    db
        .select("*").from('users')
        .then(data => {
            if (data.length) {
                res.json(data)
            } else {
                res.status(400).json("Not found");
            }
        });
}

const deleteProfile = (req, res, db) => {
    const { email } = req.body;
    db('users')
        .where('email', '=', email)
        .del()
        .then(deleted => {
            console.log(deleted);
            return db('login')
                        .where('email', '=', email)
                        .del()
        })
        .then(res.status(200).json("profile deleted"))
        .catch(err => res.status(400).json('error deleting profile')
        );
}

module.exports = {
    handleProfile: handleProfile,
    handleProfileUpdate: handleProfileUpdate,
    getScoreBoard: getScoreBoard,
    deleteProfile: deleteProfile
};