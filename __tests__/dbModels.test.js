const db = require('../data/db-config');
const Addr = require('../api/routes/addresses/addr-model');
const Orgs = require('../api/routes/organizations/org-model');


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
]
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
    it('should update address and return success responce', async () => {
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
    it('Should insert organization into db', async () => {
      await Orgs.create(testOrgs[0]);
      const allOrgs = await Orgs.findAll();

      expect(allOrgs.length).toBe(4);
    });
  });
});

