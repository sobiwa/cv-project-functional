import { Component } from 'react';
import profileIcon from '../assets/profileIcon.svg';
import Input from './Input';
import Header from './Header';
import Sidebar from './Sidebar';
import PageMain from './PageMain';

export default class PageOne extends Component {
  render() {
    const {
      employment,
      education,
      references,
      handleBlur,
      addItem,
      deleteItem,
      addSubChild,
      deleteSubChild,
      updateComponentHeight,
    } = this.props;
    return (
      <div className="page page-one">
        <Header />
        <Sidebar />
        <main>
          <section className="profile">
            <div className="section-icon">
              <img src={profileIcon} alt="profile icon" />
            </div>
            <div className="section-content">
              <h2 className="main--title">Profile</h2>
              <Input
                id="profile"
                type="textarea"
                text="A little about yourself"
              />
            </div>
          </section>
          <PageMain
            employment={employment}
            education={education}
            references={references}
            handleBlur={handleBlur}
            addItem={addItem}
            deleteItem={deleteItem}
            addSubChild={addSubChild}
            deleteSubChild={deleteSubChild}
            updateComponentHeight={updateComponentHeight}
          />
        </main>
      </div>
    );
  }
}
