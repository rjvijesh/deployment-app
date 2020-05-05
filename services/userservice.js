import { getapidata } from '../src/components/helper/api';
export const userservice = {
    getDeployments,
    deleteDeployment,
    addDeployment
}

function getDeployments() {
    var apiUrl = 'getDeployments';
    var a = getapidata(apiUrl);
    return a.then(function (result) {
        return result;
    });

}

function deleteDeployment(deploymentId) {
    if (deploymentId !== '') {
        var apiUrl = 'deleteDeployment/' + deploymentId;
        var a = getapidata(apiUrl);
        return a.then(function (result) {
            return result;
        });
    }
}

function addDeployment(deploymentDetails) {
    if (deploymentDetails !== '') {
        var apiUrl = 'addDeployment';
        var a = getapidata(apiUrl, deploymentDetails);
        return a.then(function (result) {
            return result;
        });
    }
}