import _ from 'lodash';
import {
	LIKE_JOB,
	CLEAR_LIKED_JOBS
} from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case CLEAR_LIKED_JOBS:
			return [];
		case LIKE_JOB:
			// Make a new array with the jobs just liked, and previous liked jobs
			// And ONLY show the unique jobs 
			return _.uniqBy([action.payload, ...state], 'jobkey');
		default: 
			return state;
	}
}
