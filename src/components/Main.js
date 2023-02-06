import { Component } from 'react';
import Input from './Input';
import { handleBlur, AddButton, DeleteButton } from './shared/helpers';
import Employment from './Employment';
import Education from './Education';
import uniqid from 'uniqid';
import addTaskIcon from '../assets/add-task.svg';
import profileIcon from '../assets/profileIcon.svg';
import employmentIcon from '../assets/employment.svg';
import educationIcon from '../assets/education.svg';
import referenceIcon from '../assets/reference.svg';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = handleBlur;
  }

  newItem = (defaultText) => ({ input: defaultText, default: defaultText });
  newTask = () => ({
    id: uniqid(),
    data: this.newItem(
      'Pet cats and ensured they received abundant quantities of love.'
    ),
  });
  newDetail = () => ({
    id: uniqid(),
    data: this.newItem('GPA: 4.0'),
  });

  createNewEmployment = () => {
    return {
      id: uniqid(),
      location: this.newItem('Cat Consultant at Feline Corp., New York'),
      duration: this.newItem('April 1993 - February 2023'),
      tasks: [this.newTask()],
    };
  };

  createNewEducation = () => {
    return {
      id: uniqid(),
      school: this.newItem('Bachelor of Science, Cat University'),
      duration: this.newItem('August 2003 - May 2007'),
      details: [this.newDetail()],
    };
  };

  state = {
    employment: JSON.parse(localStorage.getItem('employment')) || [
      this.createNewEmployment(),
    ],
    education: JSON.parse(localStorage.getItem('education')) || [
      this.createNewEducation(),
    ]
  };

  addEmployment = () => {
    this.setState((prevState) => ({
      employment: [...prevState.employment, this.createNewEmployment()],
    }));
  };

  addEducation = () => {
    this.setState((prevState) => ({
      education: [...prevState.education, this.createNewEducation()],
    }));
  };

  deleteItem = (id, target) => {
    this.setState((prevState) => ({
      [target]: prevState[target].filter((item) => item.id !== id),
    }));
  };

  addNested = (section, subSection, id) => {
    const creator = subSection === 'tasks' ? this.newTask : this.newDetail;
    this.setState((prevState) => ({
      [section]: prevState[section].map((item) =>
        item.id === id
          ? { ...item, [subSection]: [...item[subSection], creator()] }
          : item
      ),
    }));
  };

  deleteNested = (section, subSection, id, nestedId) => {
    this.setState((prevState) => ({
      [section]: prevState[section].map((item) =>
        item.id === id
          ? {
              ...item,
              [subSection]: item[subSection].filter(
                (nested) => nested.id !== nestedId
              ),
            }
          : item
      ),
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('employment', JSON.stringify(this.state.employment));
  }

  componentDidMount() {
    console.log(document.querySelector('.App').scrollHeight)
    console.log(document.querySelector('.App').offsetHeight)
    console.log(document.querySelector('.employment').scrollHeight)
    console.log(document.querySelector('.employment-item').scrollHeight)
  }
  render() {
    return (
      <main>
        <section className="profile">
          <div className='section-icon'><img src={profileIcon} alt='profile icon'/></div>
          <div className='section-content'>
            <h2 className="main--title">Profile</h2>
            <Input id="profile" type="textarea" text="A little about yourself" />
          </div>
        </section>
        <section className="employment">
          <div className='section-icon'><img src={employmentIcon} alt='employment icon' /></div>
          <div className='section-content'>
            <h2 className="main--title">Employment History</h2>
            {this.state.employment.map((item) => (
              <div className="employment-item">
                <Employment
                  key={item.id}
                  id={item.id}
                  location={item.location.input}
                  duration={item.duration.input}
                  tasks={item.tasks}
                  deleteTask={this.deleteNested}
                  handleBlur={this.handleBlur('employment')}
                />
                <div className="flex-buttons employment--buttons">
                  <button
                    title="Add task"
                    className="icon-button add-task-button"
                    type="button"
                    onClick={() => this.addNested('employment', 'tasks', item.id)}
                  >
                    <img src={addTaskIcon} alt="add task" />
                  </button>
                  <DeleteButton
                    onClick={() => this.deleteItem(item.id, 'employment')}
                    whatToDelete="employment"
                  />
                </div>
              </div>
            ))}
            <AddButton onClick={this.addEmployment} whatToAdd="employment" />
          </div>
        </section>

        {/*  */}
        <section className="education">
          <div className='section-icon'><img src={educationIcon} alt='education icon' /></div>
          <div className='section-content'>
            <h2 className="main--title">Education</h2>
            {this.state.education.map((item) => (
              <div className="education-item">
                <Education
                  key={item.id}
                  id={item.id}
                  school={item.school.input}
                  duration={item.duration.input}
                  details={item.details}
                  deleteDetail={this.deleteNested}
                  handleBlur={this.handleBlur('education')}
                />
                <div className="flex-buttons education--buttons">
                  <button
                    title="Add detail"
                    className="icon-button add-detail-button"
                    type="button"
                    onClick={() => this.addNested('education', 'details', item.id)}
                  >
                    <img src={addTaskIcon} alt="add detail" />
                  </button>
                  <DeleteButton
                    onClick={() => this.deleteItem(item.id, 'education')}
                    whatToDelete="education"
                  />
                </div>
              </div>
            ))}
            <AddButton onClick={this.addEducation} whatToAdd="education" />
          </div>
        </section>
      </main>
    );
  }
}
