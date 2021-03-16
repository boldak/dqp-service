let Proxy = require("./lib/proxy")

// let p = Proxy(require.resolve("./child")).then(res => {
// 	res.on("message", message => {
// 		console.log("LOG", message)
// 	})

// 	for(let i=0; i<5; i++){
// 		res.execute({interval:(6-i)*1000, i}).then(res => {console.log((6-i)*1000,"==",res.interval, res.i)})	
// 	}
	
// })


async function start (){
	let p = await Proxy(require.resolve("./child"))//.then(res => {
	p.on("message", message => {
		console.log("LOG", message)
	})

	for(let i=0; i<5; i++){
		p.execute({path:"interval",interval:(6-i)*1000, i}).then(res => {console.log((6-i)*1000,"==",res.interval, res.i)})	
	}
	
//})

}

start()