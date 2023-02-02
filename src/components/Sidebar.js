import { Component } from 'react';
import Input from './Input';
import InputChild from './InputChild';
import uniqid from 'uniqid';
import addIcon from '../assets/add.svg';
import deleteIcon from '../assets/delete.svg';
import linkIcon from '../assets/link.svg';
import linkOffIcon from '../assets/link-off.svg';
import { handleBlur } from './shared/helpers';

class DeleteButton extends Component {
  render() {
    return (
      <button
        className="delete-button"
        type="button"
        onClick={this.props.handleClick}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    );
  }
}

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.handleBlur = handleBlur;
  }
  newItem = (newDefault) => ({
    input: newDefault,
    default: newDefault,
  });

  state = {
    skills: JSON.parse(localStorage.getItem('skills')) || [
      { text: this.newItem('new skill'), id: uniqid() },
    ],
    links: JSON.parse(localStorage.getItem('links')) || [
      {
        description: this.newItem('new link'),
        url: this.newItem('example.com'),
        id: uniqid(),
      },
    ],
    linksOn: false,
  };

  addSkill = () => {
    this.setState((prevState) => ({
      skills: [
        ...prevState.skills,
        { text: this.newItem('new skill'), id: uniqid() },
      ],
    }));
  };

  addLink = () => {
    this.setState((prevState) => ({
      links: [
        ...prevState.links,
        {
          description: this.newItem('new Link'),
          url: this.newItem('example.com'),
          id: uniqid(),
        },
      ],
    }));
  };

  deleteSkill = (id) => {
    this.setState((prevState) => ({
      skills: prevState.skills.filter((item) => item.id !== id),
    }));
  };

  deleteLink = (id) => {
    this.setState((prevState) => ({
      links: prevState.links.filter((item) => item.id !== id),
    }));
  };

  handleLinkClick = (e) => {
    if (!this.state.linksOn) {
      e.preventDefault();
    }
  };

  componentDidUpdate() {
    console.log('local storage updated');
    localStorage.setItem('skills', JSON.stringify(this.state.skills));
    localStorage.setItem('links', JSON.stringify(this.state.links));
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar--section sidebar--details">
          <h4 className="sidebar--title">Details</h4>
          <Input id="address-1" type="text" text="Address line 1" />
          <Input id="address-2" type="text" text="Address line 2" />
          <Input id="telephone" type="tel" text="Phone number" />
          <Input id="email" type="email" text="email@example.com" />
        </div>
        <div className="sidebar--section sidebar--skills">
          <h4 className="sidebar--title">Skills</h4>
          {this.state.skills.map((skill) => {
            return (
              <div key={skill.id} className="sidebar--skill">
                <InputChild
                  type="text"
                  text={skill.text.input}
                  handleBlur={this.handleBlur('skills', skill.id, 'text')}
                />
                <DeleteButton handleClick={() => this.deleteSkill(skill.id)} />
              </div>
            );
          })}
          <button
            className="add-button add-skill-button"
            type="button"
            onClick={this.addSkill}
          >
            <img src={addIcon} alt="add skill" />
          </button>
        </div>
        <div className="sidebar--section sidebar--links">
          <h4 className="sidebar--title">Links</h4>
          {this.state.links.map((link) => {
            return (
              <div key={link.id} className="sidebar--link">
                <InputChild
                  type="text"
                  text={link.description.input}
                  handleBlur={this.handleBlur('links', link.id, 'description')}
                />
                <a
                  style={{ cursor: this.state.linksOn ? 'pointer' : 'text' }}
                  onClick={this.handleLinkClick}
                  href={`https://${link.url.input}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <InputChild
                    type="text"
                    text={link.url.input}
                    handleBlur={this.handleBlur('links', link.id, 'url')}
                  />
                </a>
                <DeleteButton handleClick={() => this.deleteLink(link.id)} />
              </div>
            );
          })}
          <div className="flex-buttons">
            <button
              className="add-button add-link-button"
              type="button"
              onClick={this.addLink}
            >
              <img src={addIcon} alt="add skill" />
            </button>
            <button
              title="Toggle link functionality"
              className="link-toggle-button"
              type="button"
              onClick={() =>
                this.setState((prevState) => ({ linksOn: !prevState.linksOn }))
              }
            >
              <img
                src={this.state.linksOn ? linkOffIcon : linkIcon}
                alt="toggle link functionality"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
