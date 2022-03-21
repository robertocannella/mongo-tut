import mongoose from 'mongoose';
import config from 'config';

const DATABASEUSERNAME = config.get('db.dbUser');
const DATABASEPASSWORD = config.get('db.dbPass');
const DATABASEHOST = config.get('db.dbHost');
const DATABASEPORT = config.get('db.dbPort');
const DATABASENAME = config.get('db.dbName');

// connect to mongodb
const Connect = async () => {

    let url = `mongodb://${DATABASEHOST}:${DATABASEPORT}/${DATABASENAME}`;

    try {

        let client = await mongoose.connect(url, {
            authSource: "admin",
            user: DATABASEUSERNAME,
            pass: DATABASEPASSWORD
        });

        console.log("Database is connected!");
    } catch (error) {
        console.log(error.stack);
        process.exit(1);
    }

}
Connect();

// create model for our objects to store in mongo db
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date().now },
    isPublished: Boolean
});

// compile object into mongoos
const Course = mongoose.model('Course', courseSchema)
async function createCourse() {
    // create object
    const course = new Course({
        name: 'React Course',
        author: 'Mosh',
        tags: ['react', 'front end'],
        isPublished: true
    })

    const result = await course.save().catch((e) => { console.log(e) })
    console.log(result)
}
async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh', isPublised: true })
        .limit(10)
        .sort({ name: 1 }) // -1 for decending
        .count()

    console.log(courses)
}
getCourses();