import express from 'express';
import mongoose from 'mongoose';

import UrlRoute from './routes/url.js';
import URL from './models/url.js';

mongoose.connect('mongodb://localhost:27017/', { dbName: 'short-url-db' })
  .then(() => { console.log(`DB connected`) })
  .catch((e) => { console.log(`Error connecting db ${e}`) });

const app = express();
const port = 3000;

app.use(express.json());
app.use('/url', UrlRoute);

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/:shortId', async (req, res) => {

  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate({ shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        }
      }
    }
  );

  res.redirect(entry.redirectUrl)

});

app.listen(port, () => {
  console.log(`Server is running on  port ${port}`);
});