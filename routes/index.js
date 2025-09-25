import transactionRoute from "./transactionRoute.js";

const mountRoutes = (app) => {
    app.use("/api/transactions", transactionRoute);
}

export default mountRoutes;