import { Component } from 'react';
import { handleBlur } from './shared/helpers';
import PageOne from './PageOne';
import Page from './Page';
import uniqid from 'uniqid';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = handleBlur.bind(this);
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
      height: 0,
    };
  };

  createNewEducation = () => {
    return {
      id: uniqid(),
      school: this.newItem('Bachelor of Science, Cat University'),
      duration: this.newItem('August 2003 - May 2007'),
      details: [this.newDetail()],
      height: 0,
    };
  };

  retrieveDataOrRenderDefault = (item) => {
    const creator =
      item === 'employment'
        ? this.createNewEmployment
        : this.createNewEducation;
    const dataRetrieved = JSON.parse(localStorage.getItem(item));
    return dataRetrieved && dataRetrieved.length ? dataRetrieved : [creator()];
  };

  state = {
    employment: this.retrieveDataOrRenderDefault('employment'),
    education: this.retrieveDataOrRenderDefault('education'),
    height: {},
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

  distributeItems = () => {
    console.log(this.state.height);
    let currentPageNumber = 1;
    const fullPageLength = this.state.height.page * 0.85;
    const toBeSet = {
      employment: [...this.state.employment],
      education: [...this.state.education],
    };
    let currentItem;
    const newPages = [
      {
        pageNum: 1,
        employment: [],
        education: [],
        totalLength: this.state.height.header + this.state.height.profile,
      },
    ];
    let [page] = newPages;

    while (toBeSet.employment.length || toBeSet.education.length) {
      const category = toBeSet.employment.length ? 'employment' : 'education';
      currentItem = toBeSet[category].shift();
      const defaultItemHeight = fullPageLength * 0.07;
      const margin = defaultItemHeight * 0.1;
      let currHeight =
        currentItem.height === 0 ? defaultItemHeight : currentItem.height;
      currHeight = currHeight + margin;
      if (currHeight + page.totalLength > fullPageLength) {
        currentPageNumber += 1;
        page = {
          pageNum: currentPageNumber,
          employment: [],
          education: [],
          totalLength: 0,
        };
        newPages.push(page);
      }
      page.totalLength += currHeight;
      page[category].push(currentItem);
    }

    const filteredPages = newPages.map((item) => ({
      pageNum: item.pageNum,
      employment: item.employment,
      education: item.education,
    }));

    return filteredPages;
  };

  updateComponentHeight = (section, id, newHeight) => {
    this.setState((prevState) => ({
      [section]: prevState[section].map((item) =>
        item.id === id ? { ...item, height: newHeight } : item
      ),
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('employment', JSON.stringify(this.state.employment));
    localStorage.setItem('education', JSON.stringify(this.state.education));
    if (this.checkSizes()) return;
    this.updateHeights();
  }

  updateHeights = () => {
    this.setState({
      height: {
        page: document.querySelector('.page').clientHeight,
        header: document.querySelector('.header').scrollHeight,
        profile: document.querySelector('.profile').scrollHeight,
      },
    });
  };

  handleWindowResize = () => {
    this.updateHeights();
  };

  checkSizes = () =>
    this.state.height.page === document.querySelector('.page').clientHeight &&
    this.state.height.header ===
      document.querySelector('.header').scrollHeight &&
    this.state.height.profile ===
      document.querySelector('.profile').scrollHeight;

  componentDidMount() {
    console.log('Main component mounted');
    this.updateHeights();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  render() {
    const pages = this.distributeItems();
    return (
      <div className="page-container">
        {pages.map((item) =>
          item.pageNum === 1 ? (
            <PageOne
              key={item.pageNum}
              employment={item.employment}
              education={item.education}
              handleBlur={this.handleBlur}
              addEmployment={this.addEmployment}
              addEducation={this.addEducation}
              deleteItem={this.deleteItem}
              addNested={this.addNested}
              deleteNested={this.deleteNested}
              updateComponentHeight={this.updateComponentHeight}
            />
          ) : (
            <Page
              key={item.pageNum}
              employment={item.employment}
              education={item.education}
              handleBlur={this.handleBlur}
              addEmployment={this.addEmployment}
              addEducation={this.addEducation}
              deleteItem={this.deleteItem}
              addNested={this.addNested}
              deleteNested={this.deleteNested}
              updateComponentHeight={this.updateComponentHeight}
            />
          )
        )}
      </div>
    );
  }
}
