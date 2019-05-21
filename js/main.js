new Vue({
	el:"#train-left",
	data:{
		trainlist:[]
	},
	filters:{
		
	},
	mounted: function(){
		this.trainView()
	},
	methods:{
		trainView: function(){
		this.$http.get("data/cartData.json").then(res=>{
			console.log(res)
			this.trainlist = res.body.result.list
		})
	}
	}
	
})