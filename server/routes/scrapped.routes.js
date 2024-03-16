import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createPlaylists, deletePlaylist, getPlaylist, renamePlaylistTitle, markProgress, getPlaylistProgress, getVideoProgress } from "../controllers/youtube.controllers.js";


const router = new Router();

router.route('/playlist')
    .post( createPlaylists)
    .get( getPlaylist)
    .patch( renamePlaylistTitle)
    .delete( deletePlaylist)

router.patch('/playlist/video/progress',  markProgress);
router.get('/playlist/progress',  getPlaylistProgress)
router.get('/playlist/video/progress/',  getVideoProgress)

export default router;