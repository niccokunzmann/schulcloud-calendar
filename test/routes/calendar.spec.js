const request = require('supertest');
const app = require('../../src/app');
const dbClient = require('../../src/infrastructure/database');
const fillDatabase = require('../_testutils/fillDatabase');
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('postgresql');

describe('routes/calendar', function() {

    beforeEach(function(done) {
        fillDatabase(dbClient, done);
    });

    afterEach(function(done) {
        databaseCleaner.clean(dbClient, done);
    });

    describe('GET calendar/', function() {

        it('gets a calendar', function(done) {
            // needs to be set because we have to wait for promises
            this.timeout(10000);
            request(app)
                .get('/calendar?authorization=student1_1')
                .expect('Content-Disposition', /attachment/)
                .expect('Content-Type', 'text/calendar')
                .expect(hasCalendarEntry)
                .expect(200, done);

            function hasCalendarEntry(res) {
                const lines = res.text.split('\n');
                return lines.length > 5;
            }
        });

    });
});
