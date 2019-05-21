new Vue({
	el:"#train-main",
	data:{
		trainLeftlist:[],
		trainToprightlist:[],
		trainRightlist:[]
	},
	filters:{
		
	},
	mounted: function(){
		this.trainLeftView()
	},
	methods:{
		trainLeftView: function(){
		this.$http.get("data/trainData.json").then(res=>{
			// console.log(res)
			this.trainLeftlist = res.body.result.list;
			this.trainToprightlist = res.body.result.list1;
			this.trainRightlist = res.body.result.list2;
		})
	}
	}
	
})