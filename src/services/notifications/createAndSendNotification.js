
const newNotificationForScopeIds = require('../../http-requests/newNotificationForScopeIds');

function forNewEvent(scopeIds, summary, start, end) {
    const title = "Neuer Termin \"" + summary + "\" erstellt";
    const body = "Es wurde ein neuer Termin für Sie erstellt!\n" + title + " von " + start + " bis " + end;
    console.log("Title: " + title);
    console.log("Body: " + body);
    newNotificationForScopeIds(title, body, scopeIds);
}

function forModifiedEvent(scopeIds) {
    const title = "Ein Termin wurde verändert";
    const body = "Einer Ihrer Termine wurde verändert!";
    newNotificationForScopeIds(title, body, scopeIds);
}

function forDeletedEvent(scopeIds) {
    const title = "Termin gelöscht";
    const body = "Ein Termin wurde gelöscht!";
    newNotificationForScopeIds(title, body, scopeIds);
}

module.exports = {
    forNewEvent: forNewEvent,
    forModifiedEvent: forModifiedEvent,
    forDeletedEvent: forDeletedEvent
};