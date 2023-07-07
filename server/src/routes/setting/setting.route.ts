import SettingModel from "@/models/setting";
import { Request, Response, Router } from "express";

const SETTING_ID = "2!RWUbtj5kX&eIzxJCV7w8B)GfY6+h@Kg4arTdDc9AP(sE3pv^Hy%#LF*Mn$ZuNQ"
const router = Router();

router.get("/", async (red: Request, res: Response) => {
    try {
        const data: any = await SettingModel.find({ id: SETTING_ID });
        res.json(data[0] ?? {});
    } catch (err) {
        res.status(404).json("Bad request!");
    }
});

// router.post("/", async ({ body }: Request, res: Response) => {
//     try {
//         const data = await SettingModel.create({
//             id: SETTING_ID,
//             logo: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/358515588_1273695783539284_9106714506960825889_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=NQ81yn_oUVcAX-uSi4S&_nc_ht=scontent.fsgn2-4.fna&oh=03_AdRJixaBln2RaVbHZdvy7W9Sc6fSn_opD2oBfcEKqG9yNQ&oe=64CDDD68",
//             sizeChart: "https://cdn.shopify.com/s/files/1/0004/5252/6146/files/sneaker-sizing-chart_new2103_b3860efa-b305-4473-8bb7-46f3a5b10282.png?v=1647819797",
//             jsonFields: "{}",
//         });
//         res.json(data);
//     } catch (err) {
//         res.status(404);
//     }
// });

router.put("/", async ({ body }: Request, res: Response) => {
    if (!body) return res.status(404).json("Bad request!")

    try {
        const data = await SettingModel.findOneAndUpdate({ id: SETTING_ID }, body);
        res.json(data);
    } catch (err) {
        res.status(404);
    }
});

// router.delete("/", async ({ body }: Request, res: Response) => {
//     try {
//         const data = await SettingModel.deleteOne({ id: body?.id });
//         res.json(data);
//     } catch (err) {
//         res.status(404);
//     }
// });

export default router