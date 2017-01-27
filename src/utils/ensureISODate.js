const ISO8601_DATE = /(\d{4})-(\d{2})-(\d{2})/
const ISO8601_DATE_LENGTH = 10;

function ensureISODate(timestamp) {
    if (typeof timestamp === 'string') {
        if(!timestamp.match(ISO8601_DATE)) {
            throw new Error('Given timpestamp has to be in ISO8601-Format')
        }
        return timestamp;
    } else {
        const isoString = timestamp.toISOString()
        return isoString.substr(0, ISO8601_DATE_LENGTH)
    }
}

module.exports = ensureISODate;