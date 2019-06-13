module.exports = function(RED) {
	function TypeformWebhookNode(config) {
		RED.nodes.createNode(this,config);
		RED.httpNode.post(config.path, (req, res) => {
			const {body} = req;
			const allowedKeys = ['firstname', 'name', 'email'];
			const contact = {name: null, company: null, email: null};
			const payload = body.form_response.answers.reduce((memo, ans) => {
				const [key, subkey] = ans.field.ref.split('_');
				const value = ans[ans.type];
				switch(true) {
					case key === 'contact':
						contact[subkey] = value;
						break;
					case key === 'firstname':
						memo.push({[key]: value, contact});
						break;
					case allowedKeys.includes(key):
						memo[memo.length - 1][key] = value;
						break;
					default: console.debug(`${key} key not allowed`);
				}
				return memo;
			}, []);
			this.send({payload});
			return res.send('OK');
		});
	}
	RED.nodes.registerType("typeform-webhook", TypeformWebhookNode);
}

