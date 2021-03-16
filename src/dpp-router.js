const Proxy = require("./lib/proxy")
const config = require("../config")
const moment = require("moment")

let masterStart = async function() {
	
	let p = await Proxy(require.resolve(config.service.slaveProcess))
	
	p.on("message", message => {
		console.log(`${moment().format("YY-MM-DD hh:mm:ss")} deffered >`, message)
	})

	console.log(`Slave process ${require.resolve(config.service.slaveProcess)} started`)

	return ( 
		(request,response) => {
			let command = {
				path: request.body.path,
				interval: request.body.interval,
				startedAt: moment().format("hh:mm:ss")
			}
			p.execute(command).then(res => {
				res.resolvedAt = moment().format("hh:mm:ss")
				response.send(res)
			})
			
		} 
	)

} 

module.exports = masterStart()

