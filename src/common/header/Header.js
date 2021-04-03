import React, {Component} from 'react';
import './Header.css';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Header extends Component{
    render(){
        return(
            <div>
                <header className="app-header">
                    <FastFoodIcon className="logo" fontSize="large"/>
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
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<AccountCircle />}
                        >
                            LOGIN
                        </Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;