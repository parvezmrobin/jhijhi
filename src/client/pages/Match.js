/**
 * Parvez M Robin
 * parvezmrobin@gmail.com
 * Date: Mar 31, 2019
 */


import React, { Component } from 'react';
import CenterContent from '../components/layouts/CenterContent';
import SidebarList from '../components/SidebarList';
import MatchForm from '../components/MatchForm';
import { bindMethods, formatValidationFeedback } from '../lib/utils';
import fetcher from '../lib/fetcher';
import { Link, Redirect } from 'react-router-dom';
import debounce from 'lodash/debounce';
import ErrorModal from '../components/ErrorModal';
import Notification from "../components/Notification";


class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: {
        name: '',
        team1: '',
        team2: '',
        umpire1: '',
        umpire2: '',
        umpire3: '',
        overs: '',
        tags: [],
      },
      teams: null,
      matches: [],
      umpires: [],
      tags: [],
      isValid: {
        name: null,
        team1: null,
        team2: null,
        overs: null,
      },
      feedback: {
        name: null,
        team1: null,
        team2: null,
        overs: '',
      },
      message: null,
      showErrorModal: false,
      searchKeyword: '', // if `searchKeyword` is not empty, then matched tags will be shown
    };
    bindMethods(this);
  }

  handlers = {
    onChange(action) {
      this.setState(prevState => {
        return { match: { ...prevState.match, ...action } };
      });
    },

    onSubmit() {
      // clone necessary data from `this.state`
      const postData = { ...this.state.match };

      fetcher
        .post('matches', postData)
        .then((response) => {
          return this.setState(prevState => ({
            ...prevState,
            match: {
              name: '',
              team1: '',
              team2: '',
              umpire1: '',
              umpire2: '',
              umpire3: '',
              overs: '',
              tags: [],
            },
            matches: prevState.matches.concat({
              ...prevState.match,
              _id: response.data.match._id,
            }),
            tags: prevState.tags.concat(prevState.match.tags),
            isValid: {
              name: null,
              team1: null,
              team2: null,
              overs: null,
            },
            feedback: {
              name: null,
              team1: null,
              team2: null,
              overs: null,
            },
            message: response.data.message,
          }));
        })
        .catch(err => {
          const { isValid, feedback } = formatValidationFeedback(err);

          this.setState({
            isValid,
            feedback,
          });
        });
    },
  };

  componentDidMount() {
    fetcher
      .get('teams')
      .then(response => {
        return this.setState({
          teams: [{
            _id: null,
            name: 'None',
          }].concat(response.data),
        });
      })
      .catch(() => this.setState({ showErrorModal: true }));
    fetcher
      .get('umpires')
      .then(response => {
        return this.setState({
          umpires: [{
            _id: null,
            name: 'None',
          }].concat(response.data),
        });
      })
      .catch(() => this.setState({ showErrorModal: true }));
    fetcher
      .get('matches/tags')
      .then(response => this.setState({ tags: response.data }))
      .catch(() => this.setState({ showErrorModal: true }));
    this._loadMatches();
  }

  _loadMatches = (keyword = '') => {
    fetcher
      .get(`matches?search=${keyword}`)
      .then(response => this.setState({ matches: response.data, searchKeyword: keyword }))
      .catch(() => this.setState({ showErrorModal: true }));
  };

  componentWillUnmount() {
    fetcher.cancelAll();
  }

  render() {
    const { message, teams, searchKeyword } = this.state;
    if (teams && teams.length < 3) {
      return <Redirect to="/team?redirected=1"/>;
    }

    const regExp = new RegExp(searchKeyword, 'i');
    const sidebarItemMapper = (match) => {
      const tags = searchKeyword && match.tags && match.tags.map(
        tag => regExp.test(tag) ? tag : <span key={tag} className="text-secondary">{tag}</span>
      ); // dim tags that are not matched
      return <Link className="text-white" to={`live@${match._id}`} title={match.tags}>
        {match.name}
        {tags && <> ({tags.map((tag, i) => [!!i && ', ', tag])})</>} {/*put a comma before every element but first one*/}
      </Link>;
    };

    return (
      <div className="container-fluid pl-0">
        <Notification message={message} toggle={() => this.setState({ message: null })}/>

        <div className="row">
          <aside className="col-md-3">
            <CenterContent col="col">
              <SidebarList
                title="Upcoming Matches"
                itemClass="text-white"
                itemMapper={sidebarItemMapper}
                list={this.state.matches}
                onFilter={debounce(this._loadMatches, 1000)}/>
            </CenterContent>
          </aside>
          <main className="col">
            <CenterContent col="col-lg-8 col-md-10">
              <MatchForm teams={teams || []} umpires={this.state.umpires}
                         values={this.state.match}
                         tags={this.state.tags}
                         onChange={this.onChange} onSubmit={this.onSubmit}
                         isValid={this.state.isValid} feedback={this.state.feedback}/>
            </CenterContent>
          </main>
        </div>

        <ErrorModal isOpen={this.state.showErrorModal}
                    close={() => this.setState({ showErrorModal: false })}/>
      </div>
    );
  }

}

export default Match;
