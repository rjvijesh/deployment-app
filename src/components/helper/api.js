import axios from 'axios';
import config from '../config.json';
import qs from 'qs';
export function getapidata(apiUrl, deploymentDetails) {
    var apiDomain = config.apiDomain;
    var finalApiUrl = apiDomain + apiUrl;
    var method = 'get';
    var data = {};
    if (/addDeployment/.test(apiUrl)) {
        method = 'post';
        if (deploymentDetails) {
            data = qs.stringify(deploymentDetails);
        }
    }
    return axios({
        method: method,
        url: finalApiUrl,
        data: data,
    })
        .then(response => {
            if (response != undefined && response != '') {
                // if (response.data && response.data.status !== undefined && response.data.status === 101) {
                //     if (localStorage.getItem('userDetails')) {
                //         localStorage.removeItem('userDetails');
                //     }
                //     alert("authorization failed");
                //     history.push("/login");
                // }
                return response;
            }
        })
        .catch(err => {
            console.log(err);
        })
}