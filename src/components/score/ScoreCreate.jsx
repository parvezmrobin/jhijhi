/**
 * Parvez M Robin
 * parvezmrobin@gmail.com
 * Date: Jun 01, 2019
 */


import React from 'react';
import ScoreInputV2 from "./ScoreInputV2";
import * as PropTypes from 'prop-types';

function ScoreCreate(props) {
  const propsToBePassed = {
    ...props,
    injectBowlEvent: el => el,
    defaultHttpVerb: 'post',
    shouldResetAfterInput: true,
    actionText: 'Insert',
  };
  return <ScoreInputV2 {...propsToBePassed}/>;
}

ScoreCreate.propTypes = {
  batsmen: PropTypes.arrayOf(PropTypes.object).isRequired,
  batsmanIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  matchId: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
};

export default ScoreCreate;
