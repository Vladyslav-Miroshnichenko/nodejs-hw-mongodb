import { Router } from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { contactAddSchem, contactUpdateSchem } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchem),
  ctrlWrapper(contactsController.addContactsController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactAddSchem),
  ctrlWrapper(contactsController.upsertContactsController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateSchem),
  ctrlWrapper(contactsController.patchContactsController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.deleteContactsController),
);

export default contactsRouter;
