mport React from "react";

	class LoginForm extends React.Component {
	constructor(props) {
	super(props)
	this.state = {login: '', password: ''}
	}

	handleChander(event)
	{
	this.setState(
	{
	[event.target.name]: event.target.value
	}
	);
	}

	handleSubmit(event) {
	this.props.get_token(this.state.login, this.state.password)
	event.preventDefault();
	}

	render(h) {
	return (
	<form onSubmit={(event)=> this.handleSubmit(event)}>
	<input type="text" name="login" placeholder="login" value={this.state.login} onChange={(event)=> this.handleChander(event)} />
	<input type="text" name="password" placeholder="password" value={this.state.password} onChange={(event)=> this.handleChander(event)} />
	<input type="submit" value="Login" />
	</form>

	)
	}
	}

	export default LoginForm
