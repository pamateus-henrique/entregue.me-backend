const notFound = (req,res) => res.status(404).send('This page does not exist');

module.exports = notFound;