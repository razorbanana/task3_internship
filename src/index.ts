import app from "./routes/routes.js"


const PORT = 3001
app.listen(PORT, () => {
    console.log(`app on port ${PORT}`)
})