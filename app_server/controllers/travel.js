const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = (req, res) => {
  fetch(tripsEndpoint, options)
    .then(r => r.json())
    .then(json => {
      res.render('travel', { title: 'Travlr Getaways', trips: json });
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = { travel };