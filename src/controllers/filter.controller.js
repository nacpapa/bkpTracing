import bkp from "../models/Bkp";
import clientSchema from "../models/Client";
import bkpStatus from "../models/BkpStatus";

export const clientFilter = async (req, res) => {
  const clientFilter = req.body.clientFilter;
  const statusFilter = req.body.statusFilter;
  // LO VA A NECESITAR PARA SEGUIR MOSTRANDO EL FILTRO DE CLIENTES
  const clients = await clientSchema.find().lean();
  const status = await bkpStatus.find().lean();
  const all = "Todos";

  if (statusFilter != all || clientFilter != all) {
    if (statusFilter != all && clientFilter != all) {
      const bkps = await bkp
        .find({ client: clientFilter, status: statusFilter })
        .lean();
      res.render("index", {
        bkps: bkps,
        clients: clients,
        bkpStatus: status,
      });
    } else {
      if (clientFilter != all) {
        const bkps = await bkp.find({ client: clientFilter }).lean();
        res.render("index", {
          bkps: bkps,
          clients: clients,
          bkpStatus: status,
        });
      } else {
        const bkps = await bkp.find({ status: statusFilter }).lean();
        res.render("index", {
          bkps: bkps,
          clients: clients,
          bkpStatus: status,
        });
      }
    }
  } else {
    const bkps = await bkp.find().lean();
    res.render("index", { bkps: bkps, clients: clients, bkpStatus: status });
  }
};
