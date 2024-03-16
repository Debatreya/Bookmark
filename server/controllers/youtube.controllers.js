import { google } from 'googleapis';
import Scrapped from '../models/youtube.model.js';
import usetube from 'usetube'

async function createPlaylists(req, res) {
    // const {email} = req.user;
    console.log(req.body);
    const {email, url} = req.body;
    if (!email || !url) {
        console.log(email, url);
        return res.status(400).json({ error: "Email and URL are required fields" });
    }
    // Check if it is a video URL or a playlist URL
    if (url.includes('watch?v=')) {
        return createVideo(url, email, res);
    }
    // If it is a playlist URL
    const playlist_url = url;
    let playlist_title = req.body.title;
    // Check if the playlist exists
    const user = await Scrapped.findOne({email});
    if(user){
        const existingPlaylist = user.customCourse.find(course => course.playlist_url === playlist_url);
        const existingTitle = user.customCourse.find(course => course.playlist_title === playlist_title);
        if (existingPlaylist || existingTitle) {
            return res.status(400).json({ error: "Either Playlist with same URL or TITLE already exists" });
        }
    }
    // If playlist is not present then create a new one
    let parseUrl;
    let id;
    try {
        parseUrl = req.body.url.match(/list=([^&]+)/)
        id = parseUrl[1];
    } catch (error) {
        return res.status(400).json({ error: "Invalid URL" });
    }
    
    const playlist = await usetube.getPlaylistVideos(id);
    playlist_title = playlist_title.length == 0 ? playlist.title : playlist_title;
    const thumbLen = playlist.thumbnails.length - 1;
    const thumbnailUrl = playlist.thumbnails[thumbLen].url;
    const createdBy = playlist.channel.name;
    
    const perPage = 50
    // Setup Youtube API V3 Service instance
    const service = google.youtube('v3')

    // Fetch data from the Youtube API
    const { errors = null, data = null } = await service.playlistItems.list({
        key: process.env.GOOGLE_API_KEY,
        part: 'snippet,contentDetails',
        playlistId: id,
        maxResults: perPage
    }).catch(({ errors }) => {

        console.log('Error fetching playlist', errors)

        return {
            errors
        }
    })
    // Send an error response if something went wrong
    if (errors !== null) {
        res.json({
            errors: 'Error fetching playlist'
        })

        return
    }
    const items = data.items
    console.log("Next Page", data.nextPageToken);
    // If there are more results then push them to our playlist
    if (data.nextPageToken != null) {

        // Store the token for page #2 into our variable
        let pageToken = data.nextPageToken

        while (pageToken !== null) {
            // Fetch data from the Youtube API
            const youtubePageResponse = await service.playlistItems.list({
                key: process.env.GOOGLE_API_KEY,
                part: 'snippet,contentDetails',
                playlistId: id,
                maxResults: perPage,
                pageToken: pageToken
            })

            // Add the videos from this page on to our total items list
            youtubePageResponse.data.items.forEach(item => items.push(item))

            // Now that we're done set up the next page token or empty out the pageToken variable so our loop will stop
            pageToken = ('nextPageToken' in youtubePageResponse.data) ? youtubePageResponse.data.nextPageToken : null
        }
    }

    console.log(`Fetched ${items.length} videos from https://www.youtube.com/playlist?list=${id}`)
    const allVideos = items.map(video => {
        return {
            video_title: video.snippet.title,
            video_url: `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`
        }
    })
    try{
        if(user){
            user.customCourse.push({
                thumbnailUrl,
                createdBy,
                playlist_title,
                playlist_url,
                videos: allVideos
            })
            await user.save();
            return res.json(user);
        }

        const customCourse = [{
            thumbnailUrl,
            createdBy,
            playlist_title,
            playlist_url,
            videos: allVideos
        }]
        const youtube_course = await Scrapped.create({
            email,
            customCourse: customCourse
        })
        console.log(youtube_course);
        return res.json(youtube_course);
    }catch(err){
        console.log(err.message);
        return res.json({
            success: false,
            message: err.message,
        })
    }
}

// If the given URL is a single video URL, not a playlist URL
const createVideo = async (videoUrl, email, res) => {
    const user = await Scrapped.findOne({email});
    try{
        const videoId = videoUrl.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        // Using youtube api to get video details using google api key
        const service = google.youtube('v3');
        let video = await service.videos.list({
            key: process.env.GOOGLE_API_KEY,
            part: 'snippet',
            id: videoId
        });
        if(video.data.items.length == 0){
            return res.status(400).json({error: "Invalid Video URL"});
        }
        video = video.data.items[0].snippet;
        console.log(video);
        if(!user){
            const customCourse = [{
                thumbnailUrl: video.thumbnails.default.url,
                createdBy: "Not Applicable",
                playlist_title: "##Single Videos##",
                playlist_url: "",
                videos: [{
                    video_title: video.title,
                    video_url: videoUrl
                }]
            }]
            const youtube_course = await Scrapped.create({
                email,
                customCourse: customCourse
            })
            console.log(youtube_course);
            return res.status(200).json(youtube_course);
        }
        // I will create a special playlist for single videos
        // When a user adds a single video, It will add that video in a playlist named "##Single Videos##"
        const playlist = user.customCourse.find(course => course.playlist_title == "##Single Videos##");
        if(!playlist){
            const customCourse = {
                thumbnailUrl: video.thumbnails.default.url,
                createdBy: "Not Applicable",
                playlist_title: "##Single Videos##",
                playlist_url: "",
                videos: [{
                    video_title: video.title,
                    video_url: videoUrl
                }]
            };
            user.customCourse.push(customCourse);
            await user.save();
            return res.status(200).json("Video added successfully");
        }
        playlist.videos.push({
            video_title: video.title,
            video_url: videoUrl
        });
        await user.save();
        return res.status(200).json({message: "Video added to playlist"});
    }
    catch(err){
        console.log(err.message);
        return res.json({
            success: false,
            message: err.message,
        })
    }
}

const getPlaylist = async (req, res) => {
    // const { email } = req.user;
    const email = req.query.email;
    try {
        // Check if email exists
        const user = await Scrapped.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract customCourse array
        const customCourse = user.customCourse;

        return res.status(200).json({ customCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const deletePlaylist = async (req, res) => {
    console.log("In delete Controller");
    // const { email } = req.user;
    const email = req.query.email
    const url = req.query.url
    // const { url } = req.body;
    console.log(url);
    try {
        // Check if email exists
        const user = await Scrapped.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the index of the playlist with the given URL
        const playlistIndex = user.customCourse.findIndex(course => course.playlist_url == url);

        if (playlistIndex == -1) {
            return res.status(404).json({ message: "Playlist not found for the given URL" });
        }

        // Remove the playlist from the customCourse array
        user.customCourse.splice(playlistIndex, 1);

        // Save the updated user object
        await user.save();

        return res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const renamePlaylistTitle = async (req, res) => {
    const { email, url, title } = req.body;
    const playlist_url = url.trim();
    const new_playlist_title = title.trim()

    try {
        // Check if email exists
        const user = await Scrapped.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the playlist with the given URL
        const playlist = user.customCourse.find(course => course.playlist_url === playlist_url);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found for the given URL" });
        }

        // Update the playlist_title
        playlist.playlist_title = new_playlist_title;

        // Save the updated user object
        await user.save();

        return res.status(200).json({ message: "Playlist title updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const markProgress = async (req, res) => {
    // const { email } = req.user;
    const { id, videoId, email } = req.body;
    console.log(id, videoId, email);
    
    try {
        const user = await Scrapped.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        console.log(user);
        const playlist = user.customCourse.find(course => course.playlist_url == id);
        if(!playlist){
            return res.status(404).json({message: "Playlist not found"});
        }
        const video = playlist.videos.find(video => video.video_url == videoId);
        if(!video){
            return res.status(404).json({message: "Video not found"});
        }
        video.completed = !video.completed;
        await user.save(); 
        return res.status(200).json({message: "Video Progress Updated"});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getPlaylistProgress = async (req, res) => {
    // const { email } = req.user;
    const email = req.query.email;
    const id = req.query.id;
    try {
        const user = await Scrapped.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const playlist = user.customCourse.find(course => course.playlist_url == id);
        if(!playlist){
            return res.status(404).json({message: "Playlist not found"});
        }
        const videos = playlist.videos;
        const completedVideos = videos.filter(video => video.completed === true);
        return res.status(200).json({completed : completedVideos.length , total: videos.length});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
} 

const getVideoProgress = async (req, res) => {
    // const { email } = req.user;
    const email = req.query.email
    const { id, videoId } = req.query;
    try {
        const user = await Scrapped.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const playlist = user.customCourse.find(course => course.playlist_url == id);
        if(!playlist){
            return res.status(404).json({message: "Playlist not found"});
        }
        const video = playlist.videos.find(video => video.video_url == videoId);
        if(!video){
            return res.status(404).json({message: "Video not found"});
        }
        return res.status(200).json({completed: video.completed});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export {
    createPlaylists,
    getPlaylist,
    deletePlaylist,
    renamePlaylistTitle,
    markProgress,
    getPlaylistProgress,
    getVideoProgress
};