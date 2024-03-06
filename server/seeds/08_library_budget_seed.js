const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('library_budgets').del();

    // Inserts seed entries
    return knex('library_budgets').insert([
        {
            BudgetID: uuidv4(),
            Date: new Date().toISOString().split('T')[0],
            Money: 5000,
            Description: 'Purchase of new books'
        },
        {
            BudgetID: uuidv4(),
            Date: new Date().toISOString().split('T')[0],
            Money: 10000,
            Description: 'Received funding from the city council'
        },
        {
            BudgetID: uuidv4(),
            Date: new Date().toISOString().split('T')[0],
            Money: 2000,
            Description: 'Maintenance and repair of library infrastructure'
        },
        {
            BudgetID: uuidv4(),
            Date: new Date().toISOString().split('T')[0],
            Money: 5000,
            Description: 'Donation received from a local business'
        },
        {
            BudgetID: uuidv4(),
            Date: new Date().toISOString().split('T')[0],
            Money: 3000,
            Description: 'Payment for library staff salaries'
        },
    ]);
};