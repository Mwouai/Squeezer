var GameScreen = Class.create({

	initialize: function() {
		this.screenName = "mainTitle";
		this.myGSObject = new GS_mainTitle(this);
		
	},
	switchGameScreen: function(screenName){
		switch(screenName)
		{
			case 'mainTitle':
				this.myGSObject = new GS_mainTitle(this);
				break;
			case 'pickSqueez':
				this.myGSObject = new GS_pickSqueez(this);
				break;
			case 'battle':
				this.myGSObject = new GS_battle(this);
				break;
			case 'versus':
				this.myGSObject = new GS_versus(this);
				break;
			case 'options':
				this.myGSObject = new GS_options();
				break;
			default:
				console.log(screenName+" n'a pas ete creer");
				break;
		}
	},
	getScreenName: function(){
		return this.screenName;
	},
	returnGameScreen: function() {
		return this.myGSObject;
	},
	update: function(){
		this.returnGameScreen().update();
	},
	draw: function() {
		this.returnGameScreen().draw();
	},
});