import ContactCollection from '../db/model/contactSchema.js';

export const getContact = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);
