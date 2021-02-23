const db = require('../data/db-config');
const Addr = require('../api/routes/addresses/addr-model');
const Orgs = require('../api/routes/organizations/org-model');
const Users = require('../api/routes/users/userModel');

//Mock Data:
const addrs = [
  {
    address: '904 E. Hartson Ave',
    cityName: 'Spokane',
    state: 'WA',
    zipCode: 99202,
  },
  {
    address: '123 Mystery Lane',
    cityName: 'Spokane',
    state: 'WA',
    zipCode: 99202,
  },
  {
    address: '904 E. Hartson Ave',
    cityName: 'Spokane',
    state: 'WA',
    zipCode: 99202,
  },
];

const testOrgs = [
  {
    organization: 'Test organization',
  },
  {
    organization: 'Non-Profit',
  },
];

const testUser = {
  id: '00u4o22duEeEM1UITEST',
  email: 'test@gmail.com',
  firstName: 'Test',
  lastName: 'Test',
  role: 'tenant',
};
//Organize DB
// !! Ideally move migrate and rollback to before All - this is slowing the test down
//Find a way around foreign key constraint when truncating addresses
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

//CRUD Tests
describe('Address Model', () => {
  describe('CRUD Operations', () => {
    it('should insert provided addresses into the db', async () => {
      const seedAddrs = await Addr.findAll();
      const initialLength = seedAddrs.length;

      await Addr.create(addrs[0]);
      const newAddrs = await Addr.findAll();

      expect(newAddrs.length).toBeGreaterThan(initialLength);
    });
    it('should update address and return success response', async () => {
      await Addr.create(addrs[0]);
      const updated = await Addr.update(1, addrs[1]);

      // 1 is the success response - this is worth fixing
      expect(updated).toBe(1);
    });
    it('should delete address', async () => {
      await Addr.create(addrs[0]);
      await Addr.remove(5);

      const addrLength = await Addr.findAll();

      expect(addrLength.length).toBe(4);
    });
    it('should find address by id', async () => {
      const foundById = await Addr.findBy({ id: 1 });

      expect(foundById).toHaveLength(1);
    });
  });
});

describe('Organization Model', () => {
  describe('Crud Operations', () => {
    it('should insert organization into db', async () => {
      await Orgs.create(testOrgs[0]);

      const allOrgs = await Orgs.findAll();

      expect(allOrgs.length).toBe(4);
    });
    it('should update organization and return success response', async () => {
      await Orgs.create(testOrgs[0]);

      const updateRes = await Orgs.update(4, testOrgs[1]);
      const updatedOrg = await Orgs.findById(4);

      expect(updateRes).toBe(1);
      expect(updatedOrg.organization).toBe('Non-Profit');
    });
    it('should delete target organization', async () => {
      await Orgs.create(testOrgs[0]);

      const deleteRes = await Orgs.remove(4);
      const allOrgs = await Orgs.findAll();

      expect(deleteRes).toBe(1);
      expect(allOrgs.length).toBe(3);
    });
    // it('should find organization by name', async () => {
    //   await Orgs.create(testOrgs[0]);

    //   const foundOrg = await Orgs.findBy({organization: 'Test organization'});

    //   expect(foundOrg.organization).toBe('Test organization');
    // });
  });
});

describe('Users Model', () => {
  describe('Crud Operations', () => {
    it('Should return all users', async () => {
      const allUsers = await Users.findAll();
      expect(allUsers.length).toBe(4);
    });
    it('Should add a user', async () => {
      await Users.findOrCreateProfile(testUser);
      const allUsers = await Users.findAll();
      expect(allUsers.length).toBe(5);
    });
    it('Should update a user', async () => {
      await Users.findOrCreateProfile(testUser);
      await Users.update('00u4o22duEeEM1UITEST', {
        ...testUser,
        firstName: 'Updated',
      });
      const updated = await Users.findById('00u4o22duEeEM1UITEST');
      expect(updated.firstName).toBe('Updated');
    });
    it('Should delete a user', async () => {
      await Users.findOrCreateProfile(testUser);
      const preUsers = await Users.findAll();

      await Users.remove('00u4o22duEeEM1UITEST');
      const postUsers = await Users.findAll();

      expect(preUsers.length - postUsers.length).toBe(1);
    });
  });
});
