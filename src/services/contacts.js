import ContactCollection from '../db/model/contactSchema.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContact = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const items = await ContactCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const total = await ContactCollection.countDocuments();
  const paginationData = calcPaginationData({ total, page, perPage });

  return {
    items,
    total,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
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
