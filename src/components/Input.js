import { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      text: localStorage.getItem(props.id) || props.text,
    };
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleFocus = (e) => {
    e.target.select();
  };

  handleBlur = () => {
    this.setState((prevState) => ({
      text: prevState.text || this.props.text,
      isEditing: false,
    }));
    localStorage.setItem(this.props.id, this.state.text);
  };

  beginEdit = (e) => {
    this.setState({ isEditing: true });
    e.target.focus();
  };
  render() {
    const { type } = this.props;
    return (
      <div>
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
          <span className='true-text' onClick={this.beginEdit}>{this.state.text}</span>
        )}
      </div>
    );
  }
}
