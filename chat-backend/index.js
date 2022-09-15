require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { User, Video, History, LikedVideos, SavedVideos, Playlist, Notes, Chat } = require('./routes/index')
const { appConnection } = require('./utils/appConnection')

const app = express();
const PORT = process.env['PORT'];
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "Hello from revirt-chat powered by streamIO" })
});

app.use('/chat', Chat);

/*
app.use('/user', User);
app.use('/video', Video);

app.use('/history', History);

app.use('/likedVideos', LikedVideos);

app.use('/savedVideos', SavedVideos);

app.use('/playlist', Playlist);

app.use('/notes', Notes);
*/

app.use('*', (req, res) => {
  res.status(404).send("Error 404 - Page not found.")
});

app.listen(PORT, () => appConnection(PORT));
const mySecret = process.env['PORT']