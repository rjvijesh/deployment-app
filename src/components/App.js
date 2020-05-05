import React, { Component } from 'react';
import AddDeployment from './AddDeployment';
import DeploymentDetails from './DeploymentDetails';
import { userservice } from '../../services/userservice';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deploymentDetails: null,
            templateDetails: null
        }
        this.setTemplateDetails = this.setTemplateDetails.bind(this);
        this.deleteDeploymentById = this.deleteDeploymentById.bind(this);
    }

    setTemplateDetails(data) {
        console.log("item=", data);
        //this.setState({ deploymentDetails: [data, ...this.state.deploymentDetails] });
        this.setState(prevState => ({
            deploymentDetails: [data, ...prevState.deploymentDetails]
        }))
    }

    deleteDeploymentById(deploymentId) {
        console.log("deploymentId=", deploymentId);
        if (deploymentId !== '') {
            this.setState({
                deploymentDetails: this.state.deploymentDetails.filter(function (deploymentid) {
                    console.log(deploymentid);
                    return deploymentid._id !== deploymentId
                })
            });
        }
    }


    componentDidMount() {
        console.log("App page componentDidMount");
        userservice.getDeployments()
            .then(result => {
                if (result !== undefined && result.data && result.data.deploymentdetails) {
                    this.setState({ deploymentDetails: result.data.deploymentdetails, templateDetails: result.data.templateDetails });
                }
            })

    }

    render() {
        if (this.state.deploymentDetails) {
            console.log("deploymentDetails at app page", this.state.deploymentDetails);
        }
        return (
            <React.Fragment>
                <div><AddDeployment setNewTemplateDetails={this.setTemplateDetails} templateDetails={this.state.templateDetails} /></div>
                <div><DeploymentDetails deleteDeploymentById={this.deleteDeploymentById} deploymentDetails={this.state.deploymentDetails} /></div>
            </React.Fragment >
        )
    }
}

export default App