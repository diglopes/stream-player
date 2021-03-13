const express = require("express")
const fs = require("fs")
const { promisify } = require("util")

const app = express()
const promisifiedStat = promisify(fs.stat)

app.use(express.static("public"))

app.get("/audio", async (req, res) => {
    const filePath = "./audio.ogg"
    const stat = await promisifiedStat(filePath)
    res.set("Content-Type", "audio/ogg")
    res.set("Content-Length", stat.size)
    const highWaterMark = 2
    const stream = fs.createReadStream(filePath, { highWaterMark })
    stream.on("end", () => console.log("IT'S ALL FOLKS!"))
    stream.pipe(res)
})

app.listen(3000, () => console.log("App running"))