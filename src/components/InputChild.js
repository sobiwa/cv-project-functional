import { Component } from 'react';

export default class InputChild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      text: props.text
    };
  }

  handleChange = (e) => {
    this.setState({text: e.target.value});
  };

  handleFocus = (e) => {
    e.target.select();
  };

  handleBlur = () => {
    this.setState({isEditing: false})
    this.props.handleBlur(this.state.text)
  };

  beginEdit = (e) => {
    this.setState({ isEditing: true });
    e.target.focus();
  };
  render() {
    const { type, text } = this.props;
    return (
      <div>
        {this.state.isEditing ? (
          <div className="edit-container">
            <span className="expander">
              {this.state.text || this.props.text}
            </span>
            <input
              cols='10'
              wrap='hard'
              rows='10'
              autoFocus
              onFocus={this.handleFocus}
              type={type}
              onBlur={this.handleBlur}
              value={this.state.text}
              onChange={this.handleChange}
            />
            <span className="focus-indicator" />
          </div>
        ) : (
          <span onClick={this.beginEdit}>{text}</span>
        )}
      </div>
    );
  }
}
