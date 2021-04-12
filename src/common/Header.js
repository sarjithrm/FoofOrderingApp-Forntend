import React, {Component} from 'react';
import './Header.css';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function(props){
    return(
        <Typography component="div" style={{padding: "0px 30px", textAlign: 'center'}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component{

    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            snackbarIsOpen: false,
            value: 0,
            logincontactno: "",
            loginpassword: "",
            firstname: "",
            lastname: "",
            registerContactno: "",
            registerPassword: "",
            email: "",
            loginContactnoRequired: "displayNone",
            loginPasswordRequired: "displayNone",
            firstnameRequired: "displayNone",
            registerPasswordRequired: "displayNone",
            registerContactnoRequired: "displayNone",
            emailRequired: "displayNone",
            emailValid: "displayNone",
            passwordValid: "displayNone",
            contactValid: "displayNone",
            logincontactValid: "displayNone",
            error: "displayNone",
            errorMessage: "",
            loginerror: "displayNone",
            loginerrorMessage: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            anchorEl: null
        }
    }

    searchChangeHandler = (event) => {
        this.props.searchHandler(event.target.value);
    }

    openModalHandler = () => {
        this.setState({modalIsOpen: true, loginContactnoRequired: "displayNone", value: 0, loginPasswordRequired: "displayNone"})
    }

    closeModalHandler = () =>{
        this.setState({modalIsOpen: false})
    }

    openSnackbar = () => {
        this.setState({snackbarIsOpen: true})
    }

    closeSnackbar = () =>{
        this.setState({snackbarIsOpen: false})
    }

    tabChangeHandler = (event, value) => {
        this.setState({value})
    }

    loginClickHandler = () =>{
        const contactRegex = /^[0-9]{10}$/;
        this.state.logincontactno === "" ? this.setState({loginContactnoRequired: "displayBlock"}) : this.setState({loginContactnoRequired: "displayNone"});
        if(this.state.logincontactno !== ""){
            contactRegex.test(this.state.logincontactno) ? this.setState({logincontactValid: "displayNone"}) : this.setState({logincontactValid: "displayBlock"});
        }
        this.state.loginpassword === "" ? this.setState({loginPasswordRequired: "displayBlock"}) : this.setState({loginPasswordRequired: "displayNone"});
        
        if(this.state.loginContactnoRequired === "displayNone" && this.state.logincontactValid === "displayNone" 
            && this.state.loginPasswordRequired === "displayNone"){
            let data = null;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(this.status === 200){
                        sessionStorage.setItem("firstname", JSON.parse(this.responseText).first_name);
                        sessionStorage.setItem("access-token", xhr.getResponseHeader("access-token"));

                        that.setState({
                            loggedIn: true
                        });
                        that.closeModalHandler();
                        that.props.openSnackbar();
                    }else{
                        that.setState({loginerror: "displayBlock"});
                        that.setState({loginerrorMessage: JSON.parse(this.responseText).message});
                    }
                }
            });

            xhr.open("POST", this.props.baseUrl + "customer/login");
            xhr.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.logincontactno + ":" + this.state.loginpassword));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(data);
        }
    }

    inputContactnoChangeHnadler = (e) =>{
        this.setState({logincontactno: e.target.value});
    }

    inputPasswordChangeHnadler = (e) =>{
        this.setState({loginpassword: e.target.value});
    }

    inputFirstnameChangeHnadler = (e) =>{
        this.setState({firstname: e.target.value});
    }

    inputLastnameChangeHnadler = (e) =>{
        this.setState({lastname: e.target.value});
    }

    inputEmailChangeHnadler = (e) =>{
        this.setState({email: e.target.value});
    }

    inputRegisterPasswordChangeHnadler = (e) =>{
        this.setState({registerPassword: e.target.value});
    }

    inputRegisterContactnoChangeHnadler = (e) =>{
        this.setState({registerContactno: e.target.value});
    }

    registerClickHandler = () =>{
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$%&*!^]).*$/;
        const contactRegex = /^[0-9]{10}$/;
        this.state.firstname === "" ? this.setState({firstnameRequired: "displayBlock"}) : this.setState({firstnameRequired: "displayNone"});
        this.state.email === "" ? this.setState({emailRequired: "displayBlock"}) : this.setState({emailRequired: "displayNone"});
        if(this.state.email !== ""){
            emailRegex.test(this.state.email) ? this.setState({emailValid: "displayNone"}) : this.setState({emailValid: "displayBlock"});
        }
        this.state.registerPassword === "" ? this.setState({registerPasswordRequired: "displayBlock"}) : this.setState({registerPasswordRequired: "displayNone"});
        if(this.state.registerPassword !== ""){
            passwordRegex.test(this.state.registerPassword) ? this.setState({passwordValid: "displayNone"}) : this.setState({passwordValid: "displayBlock"});
        }
        this.state.registerContactno === "" ? this.setState({registerContactnoRequired: "displayBlock"}) : this.setState({registerContactnoRequired: "displayNone"});
        if(this.state.registerContactno !== ""){
            contactRegex.test(this.state.registerContactno) ? this.setState({contactValid: "displayNone"}) : this.setState({contactValid: "displayBlock"});
        }
        
        if(this.state.firstnameRequired === "displayNone" && this.state.emailRequired === "displayNone" && this.state.emailValid === "displayNone" 
            && this.state.passwordValid === "displayNone" && this.state.registerPasswordRequired === "displayNone" 
            && this.state.registerContactnoRequired === "displayNone" && this.state.contactValid === "displayNone"){   

                        let data = JSON.stringify({
                            "contact_number": this.state.registerContactno,
                            "email_address": this.state.email,
                            "first_name": this.state.firstname,
                            "last_name": this.state.lastname,
                            "password": this.state.registerPassword
                        });
                        
                        let that = this;
                        let xhr = new XMLHttpRequest();

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                if(xhr.status === 201){
                                    that.setState({ value: 0});
                                    that.openSnackbar();
                                }else{
                                    that.setState({error: "displayBlock"});
                                    that.setState({errorMessage: JSON.parse(this.responseText).message});
                                }
                            }
                        });

                        xhr.open("POST", this.props.baseUrl + "customer/signup");
                        xhr.setRequestHeader("Cache-Control", "no-cache");
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(data);
                    }
    }

    logoutClickHandler = () => {
        this.setState({ anchorEl: null});
        sessionStorage.clear();
        window.location = "http://localhost:3000/";
    }

    profileClickHandler = () => {
        this.props.paths.history.push('/profile');
    }

    render(){

        const open = Boolean(this.state.anchorEl);

        const handleMenu = (event) => {
            this.setState({ anchorEl: event.currentTarget});
        };

        const handleClose = () => {
            this.setState({ anchorEl: null});
        };

        return(
            <div>
                <header className="app-header">
                    <FastFoodIcon className="logo" fontSize="large"/>
                    { this.props.profile === 1 &&
                    <div className="search">
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                        <Input
                            placeholder="Search by Restaurant Name"
                            className="searchInput"
                            inputProps={{ 'aria-label': 'search' }}
                            disableUnderline={false}
                            style={{color: 'white'}}
                            onChange={(event) => this.searchChangeHandler(event)}
                        />
                    </div>
                    }
                    <div>
                        {this.state.loggedIn === false && 
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<AccountCircle />}
                                onClick={this.openModalHandler}
                            >
                                LOGIN
                            </Button>
                        }
                        {this.state.loggedIn === true &&
                            <div> 
                            <Button
                                startIcon={<AccountCircle />}
                                style={{backgroundColor: "#333333", color: "#BDC3C7"}}
                                onClick={handleMenu}
                            >
                                {sessionStorage.getItem("firstname")}
                            </Button>
                            <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            getContentAnchorEl={null}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                            transformOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            variant="menu"
                            >
                                { this.props.profile === 1 &&
                                    <MenuItem onClick={this.profileClickHandler}>My Account</MenuItem>
                                }
                                <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                            </Menu>
                            </div>
                        }   
                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"/>
                        <Tab label="Register"/>
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="loginContactno"> Contact No. </InputLabel>
                            <Input id="loginContactno" type="text" logincontactno={this.state.logincontactno} onChange={this.inputContactnoChangeHnadler}/>
                            <FormHelperText className={this.state.loginContactnoRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.logincontactValid}>
                                <span className="red">Invalid Contact</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="loginPassword"> Password </InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginpassword} onChange={this.inputPasswordChangeHnadler}/>
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <FormHelperText className={this.state.loginerror}>
                            <span className="red">{this.state.loginerrorMessage}</span>
                        </FormHelperText>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>          
                    </TabContainer>
                    }
                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="firstname"> First Name </InputLabel>
                            <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstnameChangeHnadler}/>
                            <FormHelperText className={this.state.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="lastname"> Last Name </InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastnameChangeHnadler}/>
                        </FormControl>
                        <br/><br/>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="email"> Email </InputLabel>
                            <Input id="email" type="email" email={this.state.email} onChange={this.inputEmailChangeHnadler}/>
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.emailValid}>
                                <span className="red">Invalid Email</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="registerPassword"> Password </InputLabel>
                            <Input id="registerPassword" type="password" registerPassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHnadler}/>
                            <FormHelperText className={this.state.registerPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.passwordValid}>
                                <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="registerContactno"> Contact No. </InputLabel>
                            <Input id="registerContactno" type="text" registerContactno={this.state.registerContactno} onChange={this.inputRegisterContactnoChangeHnadler}/>
                            <FormHelperText className={this.state.registerContactnoRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.contactValid}>
                                <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <FormHelperText className={this.state.error}>
                            <span className="red">{this.state.errorMessage}</span>
                        </FormHelperText>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.registerClickHandler}>SIGNUP</Button>          
                    </TabContainer>
                    }
                </Modal>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackbarIsOpen}
                    onClose={this.closeSnackbar}
                    message="Registered successfully! Please login now!"
                />
            </div>
        )
    }
}

export default Header;
