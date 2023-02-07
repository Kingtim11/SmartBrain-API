//const fetch = require('node-fetch');

const PAT = '8923f51c9fa74259a186d350d25893fa';
const USER_ID = 'ityojvw8axin';
const APP_ID = 'eb407230b0164b2aaa22e9996628d533';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const handlePatCall = (req, res) => {
      const raw = JSON.stringify({ 
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": req.body.input
                      }
                  }
              }
          ]
      });
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
  
      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(data => {
        res.json(data);
        console.log(raw);

      })
      .catch(err => res.status(400).json('Unable to call PAT'))
    }

 const handleImage = (db) => (req,res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
 }

module.exports = {
    handleImage,
    handlePatCall
}