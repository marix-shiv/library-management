const { Model } = require('objection');

class Announcement extends Model {
    static get tableName() {
        return 'announcements';
    }

    static get idColumn() {
        return 'AnnouncementID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Title', 'Content', 'DatePosted'],
            properties: {
                AnnouncementID: { type: 'string', length: 36 },
                Title: { type: 'string', minLength: 1, maxLength: 256 },
                Content: { type: 'string', minLength: 1, maxLength: 10000 },
                DatePosted: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Announcement;