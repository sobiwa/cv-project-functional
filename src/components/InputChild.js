import { Component } from 'react';

export default class InputChild extends Component {
  //props to be sent are TEXT, HANDLEBLUR, TYPE
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      text: props.text,
    };
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleFocus = (e) => {
    e.target.select();
  };

  handleBlur = () => {
    this.setState({ isEditing: false });
    this.props.handleBlur(
      this.state.text,
      this.props.target,
      this.props.id
    );
  };

  beginEdit = (e) => {
    this.setState({ isEditing: true });
    e.target.focus();
  };
  render() {
    const { type, text } = this.props;
    return (
      <div className={this.props.className}>
        {this.state.isEditing ? (
          <div className="edit-container">
            <span className="expander">
              {this.state.text || this.props.text}
            </span>
            {type === 'textarea' ? (
              <textarea
                autoFocus
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.text}
                onChange={this.handleChange}
              />
            ) : (
              <input
                autoFocus
                onFocus={this.handleFocus}
                type={type}
                onBlur={this.handleBlur}
                value={this.state.text}
                onChange={this.handleChange}
              />
            )}
            <span className="focus-indicator" />
          </div>
        ) : (
          <span className="true-text" onClick={this.beginEdit}>
            {text}
          </span>
        )}
      </div>
    );
  }
}
