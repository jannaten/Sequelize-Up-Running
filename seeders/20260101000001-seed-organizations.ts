import { QueryInterface } from 'sequelize';

const now = new Date();

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Insert organizations
    await queryInterface.bulkInsert('Organizations', [
      { orgname: 'Acme Corporation', createdAt: now, updatedAt: now },
      { orgname: 'Globex Industries', createdAt: now, updatedAt: now },
      { orgname: 'Initech Solutions', createdAt: now, updatedAt: now },
    ]);

    // Insert products
    await queryInterface.bulkInsert('Products', [
      { name: 'Widget Pro', createdAt: now, updatedAt: now },
      { name: 'DataSync', createdAt: now, updatedAt: now },
    ]);

    // Associate org 1 with both products
    await queryInterface.bulkInsert('OrganizationProducts', [
      { OrganizationId: 1, ProductId: 1, createdAt: now, updatedAt: now },
      { OrganizationId: 1, ProductId: 2, createdAt: now, updatedAt: now },
      { OrganizationId: 2, ProductId: 1, createdAt: now, updatedAt: now },
    ]);

    // Insert localizations
    await queryInterface.bulkInsert('Localizations', [
      {
        name: 'Widget Pro EN',
        locale: 'en',
        OrganizationId: 1,
        ProductId: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Widget Pro DE',
        locale: 'de',
        OrganizationId: 1,
        ProductId: 1,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insert localized values
    await queryInterface.bulkInsert('LocalizedValues', [
      { localizedValue: 'Purchase Widget Pro', LocalizationId: 1, createdAt: now, updatedAt: now },
      { localizedValue: 'Widget Pro kaufen', LocalizationId: 2, createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('LocalizedValues', {});
    await queryInterface.bulkDelete('Localizations', {});
    await queryInterface.bulkDelete('OrganizationProducts', {});
    await queryInterface.bulkDelete('Products', {});
    await queryInterface.bulkDelete('Organizations', {});
  },
};
