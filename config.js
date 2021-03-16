module.exports = {

	service:{
		name: process.env.SERVICE_NAME || "dqp-template (Deffered Query Processing Protocol)",
		mode: process.env.NODE_ENV || "development",
		port: process.env.PORT || 3000,
		host: process.env.HOST || "localhost",
		public:"./.tmp/public",
		upload:"./.tmp/uploads",
		slaveProcess: require.resolve("./src/child")

	}

}
