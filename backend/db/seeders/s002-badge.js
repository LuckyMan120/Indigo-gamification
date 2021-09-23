'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Badge', [{
            id: 1,
            badge_name: 'Early Bird',
            badge_description: 'Signed up on the first day of the event',
            badge_icon: '',
        }, {
            id: 2,
            badge_name: 'Back for More',
            badge_description: 'Checked in on two days during the event',
            badge_icon: '',
        }, {
            id: 3,
            badge_name: 'Hot Streak',
            badge_description: 'Answered five questions in a row correctly on the first try',
            badge_icon: '',
        }, {
            id: 4,
            badge_name: 'Inspired Inferno',
            badge_description: 'Answered ten questions in a row correctly on the first try',
            badge_icon: '',
        }, {
            id: 5,
            badge_name: 'Two-Cents',
            badge_description: 'Answered five open-ended questions',
            badge_icon: '',
        }, {
            id: 6,
            badge_name: 'Inspired Intellectual',
            badge_description: 'Answered ten open-ended questions',
            badge_icon: '',
        }, {
            id: 7,
            badge_name: 'The Big Five-oh',
            badge_description: 'Earned 50 points',
            badge_icon: '',
        }, {
            id: 8,
            badge_name: 'Centuplicate',
            badge_description: 'Earned 100 points',
            badge_icon: '',
        }, {
            id: 9,
            badge_name: 'Maxed Out',
            badge_description: 'Earned the maximum 500 points!',
            badge_icon: '',
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Badge', null, {});
    }
};
