import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
import dotenv from 'dotenv';
import home from './routes/home.js';
import exphbs from 'express-handlebars';

dotenv.config(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new express();
const port = process.env.PORT || 5000;

// Configuração do mecanismo de visualização Handlebars
app.engine(
    "hbs",
    exphbs.engine({
        defaultLayout: "master",
        extname: ".hbs",
        partialsDir: [
            path.join(__dirname, "views/partials"),
            path.join(__dirname, "views/admin"),
            path.join(__dirname, "views/portal")
        ]
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lidar com arquivos estáticos
const publicDirectoryPath = path.join(__dirname, "../public/");
app.use(express.static(publicDirectoryPath));

app.use('/', home);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})