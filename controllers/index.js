const handleIndex = (req, res) => {
    res.status(200).json("you are at the index endpoint")
}

module.exports = {
    handleIndex: handleIndex
}