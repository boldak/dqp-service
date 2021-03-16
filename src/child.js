
	const Controller = require("./lib/controller")
	const { extend } = require("lodash")

	let controller = new Controller()

	controller
		.add("interval", (message, master) => {
			
			master.send( extend({}, message, {response:{status:"deffered"}}) )
			
			setTimeout(()=>{
				master.send(extend({}, message, {response:{status:"processed"}}))
			}, message.interval)

		})

		.add("hello",(message, master) => {
			setTimeout(()=>{
				master.send(extend({}, message, {response:"hello"}))
			}, message.interval)
		})

	require("./lib/slave")( controller )

	