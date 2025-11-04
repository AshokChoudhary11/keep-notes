import { Router, IRouter } from 'express';
import { 
  createNote, 
  getNotes, 
  getNoteById, 
  updateNote, 
  deleteNote 
} from '../controllers/notes.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: IRouter = Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;

