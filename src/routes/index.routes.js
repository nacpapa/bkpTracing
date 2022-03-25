import { Router } from "express";
// IMPORTO EL MODELO TASK
import bkp from "../models/Bkp";
import {
  createBkp,
  renderBkp,
  renderBkpAdd,
  renderBkpEdit,
  editBkp,
  deleteBkp,
  checkToday,
} from "../controllers/bkp.controller";
import { clientFilter } from "../controllers/filter.controller";
import { sendStatusMail } from "../controllers/mailer.controller";

const router = Router();

router.get("/", renderBkp);
router.get("/bkpAddForm", renderBkpAdd);
router.get("/bkp/:id/edit", renderBkpEdit);
router.post("/bkps/add", createBkp);
// LE COLOCAMOS UN PARAMETRO EN LA RUTA
router.post("/task/:id/edit", editBkp);
router.get("/delete/:id", deleteBkp);
router.post("/clientFilter", clientFilter);
router.get("/checkToday/:id", checkToday);
router.get("/sendStatusMail", sendStatusMail);

export default router;
