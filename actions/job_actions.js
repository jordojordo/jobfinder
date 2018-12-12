import axios from 'axios';
import qs from 'qs';
import { Location, Permissions } from 'expo';

import {
	FETCH_JOBS,
	LIKE_JOB,
	CLEAR_LIKED_JOBS
} from './types';

import JOB_DATA from './IndeedJobData.json';

// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

// const JOB_QUERY_PARAMS = {
// 	publisher: '4201738803816157',
// 	format: 'json',
// 	v: '2',
// 	latlong: 1,
// 	radius: 10,
// 	q: 'javascript'
// };

// Takes JOB_QUERY_PARAMS and turns into query string for url fetch
// const buildJobsUrl = zip => {
// 	const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
// 	return `${JOB_ROOT_URL}${query}`;
// };

// let { status } = await Permissions.askAsync(Permissions.LOCATION);

export const fetchJobs = (region, callback) => async dispatch => {
	const { latitude, longitude } = region;

	try {
		// let zip = await Location.reverseGeocodeAsync({ latitude, longitude })
		// const url = buildJobsUrl(zip);
		// let { data } = await axios.get(url);
		const data = JOB_DATA
		dispatch({ type: FETCH_JOBS, payload: data });
		callback();
		// console.log(data);
	} catch(e) {
		console.error(e);
	}
};

export const likeJob = (job) => {
	return {
		payload: job,
		type: LIKE_JOB
	};
};

export const clearLikedJobs = () => {
	return { type: CLEAR_LIKED_JOBS };
};
