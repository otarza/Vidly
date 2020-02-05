import http from './httpService';
import axios from 'axios';


export function getGenres() {
    return axios.get('https://serene-falls-40951.herokuapp.com/api/genres');
}