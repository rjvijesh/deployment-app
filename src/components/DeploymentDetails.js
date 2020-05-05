import React, { Component } from 'react'
import { userservice } from '../../services/userservice';

class DeploymentDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deploymentDetails: []
        }
        this.deleteDeployment = this.deleteDeployment.bind(this);
    }

    deleteDeployment(evt) {
        var clicked = evt.target;
        var currentID = clicked.id;

        userservice.deleteDeployment(currentID)
            .then(result => {
                console.log(result);
                if (result !== undefined && result.data.status && result.data.status == 1) {
                    this.props.deleteDeploymentById(currentID);
                }
            })
    }

    render() {
        if (this.props.deploymentDetails && this.props.deploymentDetails !== undefined && this.props.deploymentDetails.length > 0) {
            this.state.deploymentDetails = this.props.deploymentDetails;
            return (
                <React.Fragment>
                    <h2>Deployment Details</h2>
                    <table id="details">
                        <tr>
                            <th>Template Name </th>
                            <th>Version  </th>
                            <th>Url  </th>
                            <th>Action  </th>
                        </tr>

                        {this.state.deploymentDetails.map((item, i) => {
                            if (item !== undefined) {
                                return (
                                    <React.Fragment>
                                        <tr key={i} id={item._id}>
                                            <td >{item.templateName} </td>
                                            <td >{item.version} </td>
                                            <td >{item.url} </td>
                                            <button class="buttondel" id={item._id} onClick={this.deleteDeployment}>
                                                delete
                                                </button>
                                        </tr>
                                    </React.Fragment >
                                )
                            }
                        })}
                    </table>

                </React.Fragment >
            )
        } else {
            return (
                <React.Fragment>
                    <h2>Deployment Details</h2>
                    <div id="details">
                        No Deployment Details Found
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default DeploymentDetails