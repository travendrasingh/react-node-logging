import axios from 'axios';
import { postUrl, getUrl } from '../constants/url';
import API from './api';

export function getUser(data, callback) {
    // API.post(getUrl.getUser, data).then(response => {
    //     callback(response);
    // }).catch((err) => {
    //     console.log(err.message);
    // });

    axios({
        method: 'post',
        url: getUrl.getUser,
        data: data
    }).then(response => {
        callback(response);
    }).catch(function (error) {
        console.log(error.message);
    });
}

export function getUsersCount(callback) {
    // API.get(getUrl.getUsersCount).then(response => {
    //     callback(response);
    // }).catch((err) => {
    //     console.log(err.message);
    // });

    axios({
        method: 'get',
        url: getUrl.getUsersCount
    }).then(response => {
        callback(response);
    }).catch(function (error) {
        console.log(error.message);
    });
}

export function createUser(data, callback) {
    axios({
        method: 'post',
        url: postUrl.addUser,
        data: data
    }).then(response => {
        callback(response);
    }).catch(function (error) {
        console.log(error.message);
    });
}