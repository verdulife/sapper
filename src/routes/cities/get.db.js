import fetch from "node-fetch";

export async function get(req, res, next) {
    try {
        const fetchReq = await fetch("https://mp-establecimientos.vercel.app/assets/data/municipios.json");
        const fetchRes = await fetchReq.json();

        res.json(fetchRes);
    } catch (error) {
        next(error)
    }
};