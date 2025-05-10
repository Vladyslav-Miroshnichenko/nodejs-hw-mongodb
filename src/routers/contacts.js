import { Router } from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:id',
  ctrlWrapper(contactsController.getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactsController.addContactsController));

contactsRouter.put(
  '/:id',
  ctrlWrapper(contactsController.upsertContactsController),
);

contactsRouter.patch(
  '/:id',
  ctrlWrapper(contactsController.patchContactsController),
);

contactsRouter.delete(
  '/:id',
  ctrlWrapper(contactsController.deleteContactsController),
);

export default contactsRouter;
