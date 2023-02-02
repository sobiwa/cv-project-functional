import { Component } from 'react';
import Input from './Input';
import profileImg from '../assets/profile.svg';

export default class Header extends Component {
  state = {
    imgSrc: profileImg,
  };


  loadImg = (e) => {
    this.setState({ imgSrc: URL.createObjectURL(e.target.files[0]) });
  };
  render() {
    return (
      <div className="header">
        <div className="header--image">
          <label htmlFor="img-upload" className="header--image-upload-label">
            <img className='header--image-upload-image' alt="user" src={this.state.imgSrc} />
          </label>
          <input
            id="img-upload"
            className="header--image-upload"
            type="file"
            accept="image/*"
            onChange={this.loadImg}
          />
        </div>
        <div className="header--text">
          <div className="name">
            <Input id="first-name" type="text" text="First Name" />
            <Input id="last-name" type="text" text="Last Name" />
          </div>
          <div className="title">
            <Input id="job-title" type="text" text="job title" />
          </div>
        </div>
      </div>
    );
  }
}
