import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { Location } from 'expo';

import {
	FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
	publisher: '4201738803816157',
	format: 'json',
	v: '2',
	latlong: 1,
	radius: 10,
	q: 'javascript'
};

// Takes JOB_QUERY_PARAMS and turns into query string for url fetch
const buildJobsUrl = (zip) => {
	const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
	return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
	try {
		let zip = await Location.reverseGeocode(region);
		const url = buildJobsUrl(zip);
		let { data } = await axios.get(url);
		dispatch({ type: FETCH_JOBS, payload: data });
		callback();
		console.log(data);
	} catch(e) {
		console.error(e);
	}
};
