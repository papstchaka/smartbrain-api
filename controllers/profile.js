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
    deleteProfile: deleteProfile
};