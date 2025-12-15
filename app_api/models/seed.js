// travlr/app_server/models/seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Trip = require('./travlr'); // schema in the same folder

(async () => {
  try {
    const host = process.env.DB_HOST || '127.0.0.1';
    const dbURI = `mongodb://${host}/travlr`;

    await mongoose.connect(dbURI); // no useNewUrlParser / useUnifiedTopology needed

    // resolve trips.json from project root when running `node app_server/models/seed.js`
    const tripsPath = path.resolve(process.cwd(), 'data', 'trips.json');
    const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

    const result = await Trip.deleteMany({});
    console.log(`Existing trips removed. (deleted ${result.deletedCount})`);

    const docs = await Trip.insertMany(trips);
    console.log(`${docs.length} trips successfully stored.`);
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
