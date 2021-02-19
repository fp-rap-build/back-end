const db = require('../data/db-config');
const Addr = require('../api/routes/addresses/addr-model');

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

//Organize DB
// !! Ideally move migrate and rollback to before All - this is slowing the test down
//Find a way around foreign key constraint when truncating addresses
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});

//CRUD Tests
describe('Address Model', () => {
  describe('CRUD Operations', () => {
    it('should insert provided addresses into the db', async () => {
      await Addr.create(addrs[0]);
      await Addr.create(addrs[1]);

      const newAddrs = await Addr.findAll();

      expect(newAddrs).toHaveLength(2);
    });
    it('should update address and return success responce', async () => {
      await Addr.create(addrs[0]);
      const updated = await Addr.update(1, addrs[1]);

      // 1 is the success response - this is worth fixing
      expect(updated).toBe(1);
    });
    it('should delete address', async () => {
      await Addr.create(addrs[0]);
      await Addr.create(addrs[1]);

      await Addr.remove(1);

      const addrList = await Addr.findAll();

      expect(addrList).toHaveLength(1);
    });
    it('should find address by id', async () => {
      await Addr.create(addrs[0]);

      const foundById = await Addr.findBy({ id: 1 });
      expect(foundById).toHaveLength(1);
    });
  });
});
