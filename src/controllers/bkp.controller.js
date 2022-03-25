import bkp from "../models/Bkp";
import bkpStatus from "../models/BkpStatus";
import clientSchema from "../models/Client";

export const renderBkp = async (req, res) => {
  // REALIZAMOS UNA CONSULTA Y SE LA PASAMOS AL INDEX PARA QUE LA PUEDA MOSTRAR
  // CON EL LEAN LE DECIMOS QUE YA NO NOS DEVUELVA OBJETOS DE MONGODB, SINO DE JS, PORQUE SINO ES DIFICIL RECOOREROLOS
  const bkps = await bkp.find().lean();
  const clients = await clientSchema.find().lean();
  const status = await bkpStatus.find().lean();
  res.render("index", { bkps: bkps, clients: clients, bkpStatus: status });
};

export const renderBkpAdd = async (req, res) => {
  const BKPSTATUS = await bkpStatus.find().lean();
  const clients = await clientSchema.find().lean();
  res.render("bkpAddForm", {
    bkpStatus: BKPSTATUS,
    clients: clients,
  });
};
export const createBkp = async (req, res) => {
  try {
    const message = true;
    const BKP = bkp(req.body);
    await BKP.save();
    res.redirect("/", { mensaje: message });
  } catch (error) {
    console.log(error);
  }
};

export const renderBkpEdit = async (req, res) => {
  try {
    const BKP = await bkp.findById(req.params.id).lean();
    res.render("bkpEditForm", { bkp: BKP });
  } catch (error) {
    console.log(error.message);
  }
};

export const editBkp = async (req, res) => {
  const id = req.params.id;
  await bkp.findByIdAndUpdate(id, req.body);
  res.redirect("/");
};

export const deleteBkp = async (req, res) => {
  const { id } = req.params;
  await bkp.findByIdAndDelete(id);
  res.redirect("/");
};

export const checkToday = async (req, res) => {
  const now = new Date().toLocaleDateString();
  await bkp.findByIdAndUpdate(req.params.id, { bkpDate: now });
  res.redirect("/");
};
