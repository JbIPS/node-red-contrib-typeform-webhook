module.exports = function(RED) {
	function TypeformWebhookNode(config) {
		RED.nodes.createNode(this,config);
		RED.httpNode.post(config.path, (req, res) => {
			this.warn('Received');
			const {body} = req;
			this.warn(body);
			const payload = {
				answers: body.form_response.answers.reduce((memo, ans) => {
					let value = ans[ans.type];
					if(ans.type === 'choice'){
						value = value.label;
					} else if(ans.type === 'choices'){
						value = value.labels;
					}
					memo[ans.field.ref] = value;
					return memo
				}, {}),
				hidden: body.form_response.hidden
			};
			this.warn(payload);
			this.send({payload});
			this.warn('Sent');
			return res.send('OK');
		});
	}
	RED.nodes.registerType("typeform-webhook", TypeformWebhookNode);
}

