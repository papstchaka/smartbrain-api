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

const deleteProfile = (req, res, db) => {
    const { email } = req.params;
    db('users')
        .where('email', '=', email)
        .del()
        .then(res.status(200).json("Profile deleted!"))
        .catch(err => res.status(400).json('unable to get entries')
        );
    db('login')
        .where('email', '=', email)
        .del()
        .then(res.status(200).json("Profile deleted!"))
        .catch(err => res.status(400).json('unable to get entries')
        );
}

module.exports = {
    handleProfile: handleProfile,
    deleteProfile: deleteProfile
};