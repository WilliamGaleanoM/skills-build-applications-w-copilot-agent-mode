import { apiBaseUrl, app, port } from './server';

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});