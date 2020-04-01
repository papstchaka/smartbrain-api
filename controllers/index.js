const handleIndex = (req, res) => {
    res.status(200).json("you successfully reached the index endpoint")
}

module.exports = {
    handleIndex: handleIndex
}