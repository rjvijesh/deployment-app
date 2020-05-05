import React, { Component } from 'react'
import { userservice } from '../../services/userservice';
import config from '../components/config.json';
class AddDeployment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            templateVersions: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    handleChange(e) {
        var templateName = document.getElementById("templateName").value;
        var templateDetails = config.templateDetails;
        templateDetails.map((item, i) => {
            if (item[templateName] !== undefined) {
                this.setState({ templateVersions: item[templateName] });
            }
        })
    }

    resetForm() {
        document.getElementById("templateName").value = '';
        document.getElementById("templateVersions").value = '';
        document.getElementById("url").value = '';
    }

    handlesubmit(e) {
        e.preventDefault();
        const templateName = document.getElementById("templateName").value;
        const templateVersions = document.getElementById("templateVersions").value;
        const url = document.getElementById("url").value;
        if (templateName == '') {
            alert("Select Template");
            return false;
        } else if (templateVersions == '') {
            alert("Select Version");
            return false;
        } else if (url == '') {
            alert("url cannot be blank");
            return false;
        } else {
            var deploymentDetails = [];
            deploymentDetails['templateName'] = templateName;
            deploymentDetails['version'] = templateVersions;
            deploymentDetails['url'] = url;
            userservice.addDeployment(deploymentDetails)
                .then(result => {
                    if (result !== undefined && result.data !== undefined && result.data.status !== undefined && result.data.status === 1) {
                        alert(result.data.msg);
                        this.props.setNewTemplateDetails(result.data.data);
                        this.resetForm();
                    } else if (result !== undefined && result.data !== undefined && result.data.status !== undefined && data.status !== 1) {
                        alert(result.data.msg);
                        return false;
                    }
                })
        }
    }

    render() {

        // if (this.props.templateDetails && this.props.templateDetails !== undefined && this.props.templateDetails.length > 0) {
        //     var arr = [];
        //     var obj = {};

        //     console.log("templateDetails==", this.props.templateDetails);
        //     // for (var i in this.props.templateDetails) {
        //     //     if (this.props.templateDetails.hasOwnProperty(i)) {
        //     //         var obj = {};
        //     //         obj[i] = this.props.templateDetails[i];
        //     //         arr.push(obj);
        //     //     }
        //     // }
        //     this.props.templateDetails.map((item, i) => {
        //         //if (!arr.includes(item.templateName)) {
        //         arr.push({ templateName: item.templateName, version: item.version });
        //         if (!Object.keys(obj)) {
        //             if (!arr[item.templateName]) {
        //                 obj[item.templateName] = item.version;
        //                 arr.push(obj);
        //                 //}

        //                 //}

        //                 //}
        //                 //console.log(item.templateName);
        //                 //console.log(item.version);
        //             })
        //     console.log("final arr", arr);
        //     console.log("obj=", obj);
        //     var templateDet = config.templateDetails;
        //     console.log("templateDet=", templateDet);
        // }

        //templateNameDetails.push(Object.keys(item));
        //console.log("templateNameDetails", templateNameDetails);


        return (
            <div>
                <h1>Create Deployment</h1>
                <form onSubmit={this.handlesubmit} >
                    <div id="AddDeployment" className="container">
                        <select name="templateName" defaultValue={this.state.selectValue}
                            onChange={this.handleChange} id="templateName"
                        >
                            <option value="">Select Template</option>
                            {config.templateNameDetails.map((item, i) => {
                                return (
                                    <option key={i} value={item}>{item}</option>
                                )

                            })}
                        </select>

                        <select name="templateVersions"
                            id="templateVersions"
                        >
                            <option value="">Select Version</option>
                            {this.state.templateVersions !== undefined && this.state.templateVersions !== '' && this.state.templateVersions.length > 0 && this.state.templateVersions.map((version, i) => {
                                return (
                                    <option key={i} value={version}>{version}</option>
                                )

                            })}
                        </select>
                        <input type="text" id="url" placeholder="Url" />
                        <button id="addDeployment">Add Deployment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddDeployment