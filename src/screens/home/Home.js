import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Snackbar from '@material-ui/core/Snackbar';
import 'font-awesome/css/font-awesome.min.css';

const styles = theme => ({
    card: {
        maxWidth: 345,
        margin: 10
    },
    content: {
        overflowWrap: 'break-word'
    },
    footer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent:"space-between"
    },
    rating: {
        backgroundColor: '#D4AC0D',
        color: 'white',
        width: '100px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center'
    }
});

class Home extends Component{
    constructor(){
        super();
        this.state={
            restaurants: [],
            snackbarIsOpen: false
        }
    }

    getRestaurants = (restaurant_name) => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            let feed    =   []
            if (this.readyState === 4) {
                feed        =   JSON.parse(this.responseText).restaurants;
                that.setState({restaurants: feed});
            }
        });

        var url = "";
        if(restaurant_name.length === 0){
            url = this.props.baseUrl + "restaurant";
        }else{
            url = this.props.baseUrl + "restaurant/name/" + restaurant_name;
        }
        xhr.open("GET", url);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    componentDidMount = () =>{
        this.getRestaurants("");
    }

    searchHandler = (restaurant_name) => {
        this.getRestaurants(restaurant_name);
    }

    openSnackbar = () => {
        this.setState({snackbarIsOpen: true})
    }

    closeSnackbar = () =>{
        this.setState({snackbarIsOpen: false})
    }

    getDetails = (event, restaurant) => {
        let detailsPageUrl = "/restaurant/" + restaurant.id; 
        return this.props.history.push(detailsPageUrl);
    }

    render(){

        const {classes} = this.props;
        return(
            <div>
                <Header paths={this.props} searchHandler={this.searchHandler} baseUrl={this.props.baseUrl} openSnackbar={this.openSnackbar} profile={1} showSearch = {true}/>
                {this.state.restaurants.length === 0 &&
                    <h4 className="message">No restaurant with the given name.</h4>
                }
                <div className="container">
                    {this.state.restaurants.length > 0 && this.state.restaurants.map((restaurant) => (
                        <Card className={classes.card} key={restaurant.id} onClick={((event) => this.getDetails(event, restaurant))}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={restaurant.restaurant_name}
                                    height="160"
                                    image={restaurant.photo_URL}
                                    title={restaurant.restaurant_name}
                                />
                                <CardContent className={classes.content}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {restaurant.restaurant_name}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1" color="textPrimary">
                                        {restaurant.categories}
                                    </Typography>
                                    <br/>
                                    <Typography className={classes.footer}>
                                        <div className={classes.rating}>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <span>&nbsp;&nbsp;{restaurant.customer_rating} ({restaurant.number_customers_rated})</span>
                                        </div>
                                        <span>
                                            <i className="fa fa-inr" aria-hidden="true"></i> {restaurant.average_price} for two
                                        </span>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackbarIsOpen}
                    onClose={this.closeSnackbar}
                    message="Logged in successfully!"
                />
            </div>
        )
    }
}

export default withStyles(styles)(Home);
