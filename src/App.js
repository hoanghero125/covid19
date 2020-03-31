import React from "react";
import Axios from "axios";
import "./style.css"; 


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.getCountryData = this.getCountryData.bind(this); 
    }

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: [],
        rawCountriesData: []
    }

    componentDidMount() {
        this.getData();
}

    async getData () {
        const resApi = await Axios.get("https://covid19.mathdro.id/api");
        const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries = [];
        for ( let i = 0; i < resCountries.data.countries.length ; i++){
            countries.push(resCountries.data.countries[i].name);
        }
        console.log(resCountries);
        console.log(countries)
        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value,   
            countries, 
            rawCountriesData : resCountries.data.countries
        }); 
}

    async getCountryData(e) {
        if (e.target.value === "Thế giới")
        {
            return this.getData();

        }
        try {
        let countriesCode = ""
        for ( let i =-0; i< this.state.countries.length; i ++){
            if ( this.state.countries[i] === e.target.value){
                //lay ra duoc index can thiet
                // truy cap vao rawData 
                countriesCode = this.state.rawCountriesData[i].iso2;
                console.log(countriesCode)
            }
        }
        const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${countriesCode}`);
        this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value, 
        }); 
    }
        catch (err) {
            if (err.response.status === 404)
            this.setState({
                confirmed: "Không có dự liệu cụ thể",
                recovered: "Không có dự liệu cụ thể",
                deaths: "Không có dự liệu cụ thể", 
            }); 
        }
    }

    renderCountryOptions() {
        return this.state.countries.map((country, i) => {
            return <option key={i}>{country}</option>
        });
    }

    render() {
         return (
        <div className="container">
            
            <select className="dropdown" onChange={this.getCountryData}>
                <option>Thế giới</option>
                {this.renderCountryOptions()}
            </select>


            <div className="flex">
                <div className="box confirmed">
                    <h3>Sỗ ca nhiễm</h3>
                    <p>{this.state.confirmed}</p>
                </div>
                <div className="box recovered">
                    <h3>Sỗ ca đã khỏi</h3>
                    <p>{this.state.recovered}</p>
                </div>
                <div className="box deaths">
                    <h3>Số ca tử vong</h3>
                    <p>{this.state.deaths}</p>
                </div>
            </div>

        </div>);
     }
}

    // if (subject == null) {
    //     alert("Hi")
    // }

    function Check_Form() {
        var subject_input = document.forms["feedbackForm"]["subject"].value;
        if (subject_input === null || subject_input === "") {
            alert("Please Fill All Required Field");
            return false;
        } else {
            alert("Sending feedback Success!");
        }}

    document.getElementById("feedback_button").addEventListener("click", function () {
        Check_Form()
    })  

    