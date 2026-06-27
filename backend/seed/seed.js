const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const BloodDonor = require('../models/BloodDonor');
const Emergency = require('../models/Emergency');

dotenv.config();

const users = [
  { name: 'Maya Night', email: 'maya@rescuex.ai', password: 'Password123!', role: 'admin', phone: '+1234567890', location: { type: 'Point', coordinates: [77.2090, 28.6139] }, bloodGroup: 'O+' },
  { name: 'Aarav Patel', email: 'aarav@rescuex.ai', password: 'Password123!', role: 'volunteer', phone: '+1987654321', location: { type: 'Point', coordinates: [77.2200, 28.6145] }, bloodGroup: 'A+' },
  { name: 'Leah Storm', email: 'leah@rescuex.ai', password: 'Password123!', role: 'user', phone: '+1122334455', location: { type: 'Point', coordinates: [77.2300, 28.6150] }, bloodGroup: 'B+' }
];

const donors = [
  { bloodGroup: 'O+', available: true, location: { type: 'Point', coordinates: [77.2250, 28.6160] } },
  { bloodGroup: 'A-', available: true, location: { type: 'Point', coordinates: [77.2350, 28.6170] } }
];

const emergencies = [
  { type: 'accident', severity: 'critical', emergencyId: 'RX-1A2B3C4D', description: 'Car crash on highway', location: { type: 'Point', coordinates: [77.2150, 28.6140] } }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany();
    await BloodDonor.deleteMany();
    await Emergency.deleteMany();

    const createdUsers = await Promise.all(users.map(async (user) => {
      const newUser = new User(user);
      newUser.password = await bcrypt.hash(user.password, 12);
      return newUser.save();
    }));

    await Promise.all(donors.map(async (donor, index) => {
      const bloodDonor = new BloodDonor({ ...donor, user: createdUsers[index % createdUsers.length]._id });
      return bloodDonor.save();
    }));

    await Promise.all(emergencies.map(async (item) => {
      const emergency = new Emergency({ ...item, user: createdUsers[2]._id });
      return emergency.save();
    }));

    console.log('Sample data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
