import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createPlaylists, deletePlaylist, getPlaylist, renamePlaylistTitle, markProgress, getPlaylistProgress, getVideoProgress } from "../controllers/youtube.controllers.js";


const router = new Router();

router.route('/playlist')
    .post(isLoggedIn, createPlaylists)
    .get(isLoggedIn, getPlaylist)
    .patch(isLoggedIn, renamePlaylistTitle)
    .delete(isLoggedIn, deletePlaylist)

router.patch('/playlist/video/progress', isLoggedIn, markProgress);
router.get('/playlist/progress', isLoggedIn, getPlaylistProgress)
router.get('/playlist/video/progress/', isLoggedIn, getVideoProgress)

export default router;