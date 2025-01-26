import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/health", (_req, res) => {
    res.status(200).send("0");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
