import fetch from "node-fetch";

export async function get(req, res, next) {
    try {
        const fetchReq = await fetch("https://mp-establecimientos.vercel.app/assets/data/municipios.json");
        const fetchRes = await fetchReq.json();

        const city = await fetchRes.filter(
            (c) => c.nm.replaceAll(" ", "-").replaceAll("/", "_") === req.params.nm
        )[0];

        res.json(city);
    } catch (error) {
        next(error)
    }
};