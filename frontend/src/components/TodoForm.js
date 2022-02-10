import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textVal: '',
            project: this.props.projects[0].id
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.textVal, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">text</label>
                    <input type="text" className="form-control" name="textVal" value={this.state.textVal} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="project">project</label>
                    <select className="form-control" name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ToDoForm
