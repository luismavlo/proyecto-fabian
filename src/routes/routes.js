import { Router } from 'express';

import { router as userRouter } from '../user/user.routes.js';
import { router as classRouter } from '../class/class.route.js';
import { router as guestRouter } from '../guest/guest.route.js';
import { router as publicationRouter } from '../publication/publication.router.js'
import { router as commentRouter } from '../comment/comment.router.js'
import { protect } from '../user/user.middleware.js';

export const router = Router()


router.use('/users', userRouter)
router.use('/guest', guestRouter)
router.use('/comment', commentRouter)
router.use(protect)
router.use('/class', classRouter)
router.use('/publication', publicationRouter)
