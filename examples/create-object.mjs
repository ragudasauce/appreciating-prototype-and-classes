export const templateObject = {
	isHuman: false,
	intro: function() {
		return `My name is ${this.name}. Am I human? ${this.isHuman}`;
	},
};
