import ContactCollection from '../db/model/contactSchema.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactQuery = ContactCollection.find();

  if (filter.minReleaseYear) {
    contactQuery.where('releaseYear').gte(filter.minReleaseYear);
  }
  if (filter.maxReleaseYear) {
    contactQuery.where('releaseYear').lte(filter.maxReleaseYear);
  }

  const data = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const total = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();
  const paginationData = calcPaginationData({ total, page, perPage });

  return {
    data,
    total,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const getContact = (filter) => ContactCollection.findOne(filter);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate(filter, payload, {
    upsert,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
