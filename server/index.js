import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
// properly set the path when we configure directories
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();

// config using type modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware functions that run inbetween things

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// store this locally for now. Store in cloud storage AWS S3 later.
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File storage
// when poeople upload files it will be saved to this particular folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// "upload" is the variable to upload file to storage
const upload = multer({ storage });

// routes with files add path 4register then add "upload" middleware then add verifyToken once made in routes auth to protect route. 
// Register is the controller.
app.post("/auth/register", upload.single("picture"),  register);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


mongoose.set('strictQuery', false);
// Mongoose set up if 3007 doesn't connect 3001 will be the back up port
const PORT = process.env.PORT || 3001;
// connect db to node server
mongoose.
connect(process.env.MONGO_URL, {
  // .connect('mongodb://127.0.0.1:27017/socialMedia2_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} server is not connected`));
