require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

let Person;

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Wale',
    age: 23,
    favoriteFoods: ['English breakfast', 'Chipsi mayai'],
  });

  person.save(function (err, data) {
    if (err) {
      done(err);
    }

    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      done(err);
    }

    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) {
      done(err);
    }

    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) {
      done(err);
    }

    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) done(err);

    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  Person.findById(personId, function (err, data) {
    if (err) done(err);

    data.favoriteFoods.push(foodToAdd);

    data.save(function (err) {
      if (err) done(err);

      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) done(err);

      done(null, data);
    },
  );
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
