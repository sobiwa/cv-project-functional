import { Component } from 'react';
import addTaskIcon from '../assets/add-task.svg';
import profileIcon from '../assets/profileIcon.svg';
import employmentIcon from '../assets/employment.svg';
import educationIcon from '../assets/education.svg';
import referenceIcon from '../assets/reference.svg';
import Input from './Input';
import Header from './Header';
import Sidebar from './Sidebar';
import Employment from './Employment';
import Education from './Education';
import { AddButton, DeleteButton } from './shared/helpers';

export default class PageOne extends Component {
  render() {
    const {
      employment,
      education,
      handleBlur,
      addEmployment,
      addEducation,
      deleteItem,
      addNested,
      deleteNested,
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
          {employment.length > 0 && (
            <section className="employment">
              <div className="section-icon">
                <img src={employmentIcon} alt="employment icon" />
              </div>
              <div className="section-content">
                <h2 className="main--title">Employment History</h2>
                <div className="section-items">
                  {employment.map((item) => (
                    <div key={item.id} className="employment-item">
                      <Employment
                        key={item.id}
                        id={item.id}
                        location={item.location.input}
                        duration={item.duration.input}
                        tasks={item.tasks}
                        deleteTask={deleteNested}
                        handleBlur={handleBlur('employment')}
                        updateComponentHeight={updateComponentHeight}
                        height={item.height}
                      />
                      <div className="flex-buttons employment--buttons">
                        <button
                          title="Add task"
                          className="icon-button add-task-button"
                          type="button"
                          onClick={() =>
                            addNested('employment', 'tasks', item.id)
                          }
                        >
                          <img src={addTaskIcon} alt="add task" />
                        </button>
                        <DeleteButton
                          onClick={() => deleteItem(item.id, 'employment')}
                          whatToDelete="employment"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton onClick={addEmployment} whatToAdd="employment" />
              </div>
            </section>
          )}
          {/*  */}
          {education.length > 0 && (
            <section className="education">
              <div className="section-icon">
                <img src={educationIcon} alt="education icon" />
              </div>
              <div className="section-content">
                <h2 className="main--title">Education</h2>
                <div className="section-items">
                  {education.map((item) => (
                    <div key={item.id} className="education-item">
                      <Education
                        id={item.id}
                        school={item.school.input}
                        duration={item.duration.input}
                        details={item.details}
                        deleteDetail={deleteNested}
                        handleBlur={handleBlur('education')}
                        updateComponentHeight={updateComponentHeight}
                        height={item.height}
                      />
                      <div className="flex-buttons education--buttons">
                        <button
                          title="Add detail"
                          className="icon-button add-detail-button"
                          type="button"
                          onClick={() =>
                            addNested('education', 'details', item.id)
                          }
                        >
                          <img src={addTaskIcon} alt="add detail" />
                        </button>
                        <DeleteButton
                          onClick={() => deleteItem(item.id, 'education')}
                          whatToDelete="education"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton onClick={addEducation} whatToAdd="education" />
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }
}
