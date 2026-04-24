import { Organization } from '../../src/models/Organization.model';
import * as organizationService from '../../src/services/organization.service';
import { AppError } from '../../src/utils/AppError';

jest.mock('../../src/models/Organization.model');

const MockOrganization = Organization as jest.Mocked<typeof Organization>;

describe('OrganizationService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getOrganizationById', () => {
    it('returns the organization when found', async () => {
      const fakeOrg = { id: 1, orgname: 'Acme' } as Organization;
      MockOrganization.findByPk = jest.fn().mockResolvedValue(fakeOrg);

      const result = await organizationService.getOrganizationById(1);

      expect(MockOrganization.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBe(fakeOrg);
    });

    it('throws AppError 404 when the organization does not exist', async () => {
      MockOrganization.findByPk = jest.fn().mockResolvedValue(null);

      await expect(organizationService.getOrganizationById(99)).rejects.toThrow(AppError);
      await expect(organizationService.getOrganizationById(99)).rejects.toMatchObject({
        statusCode: 404,
        code: 'NOT_FOUND',
      });
    });
  });

  describe('createOrganization', () => {
    it('creates and returns a new organization', async () => {
      const input = { orgname: 'Globex' };
      const created = { id: 2, ...input } as Organization;
      MockOrganization.create = jest.fn().mockResolvedValue(created);

      const result = await organizationService.createOrganization(input);

      expect(MockOrganization.create).toHaveBeenCalledWith(input);
      expect(result).toBe(created);
    });
  });

  describe('getAllOrganizations', () => {
    it('returns rows and correct pagination meta', async () => {
      const rows = [{ id: 1, orgname: 'Acme' }] as Organization[];
      MockOrganization.findAndCountAll = jest.fn().mockResolvedValue({ count: 50, rows });

      const result = await organizationService.getAllOrganizations({ page: 2, limit: 10 });

      expect(MockOrganization.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 10, offset: 10 }),
      );
      expect(result.meta).toEqual({ page: 2, limit: 10, total: 50, totalPages: 5 });
      expect(result.rows).toBe(rows);
    });
  });

  describe('deleteOrganization', () => {
    it('calls destroy on the found organization', async () => {
      const destroyMock = jest.fn().mockResolvedValue(undefined);
      const fakeOrg = { id: 1, orgname: 'Acme', destroy: destroyMock } as unknown as Organization;
      MockOrganization.findByPk = jest.fn().mockResolvedValue(fakeOrg);

      await organizationService.deleteOrganization(1);

      expect(destroyMock).toHaveBeenCalledTimes(1);
    });
  });
});
