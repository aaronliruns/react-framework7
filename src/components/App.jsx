import React, {PropTypes} from 'react';
import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';

import {routes} from '../routes';

const pStyle = {margin: '1em 0'};

const LeftPanel = (props, context) => (
	<Panel left reveal layout="dark">
		<View id="left-panel-view" navbarThrough dynamicNavbar="true">
			{context.framework7AppContext.theme.ios ? <Navbar title="Left Panel"></Navbar> : null}
			<Pages>
				<Page>
					{context.framework7AppContext.theme.material ? <Navbar title="Left Panel"></Navbar> : null}
					<ContentBlock inner>
						<p>Left panel content goes here</p>
					</ContentBlock>
					<ContentBlockTitle>Load page in panel</ContentBlockTitle>
					<List>
						<ListItem link="/about/" title="About"></ListItem>
						<ListItem link="/form/" title="Form"></ListItem>
					</List>
					<ContentBlockTitle>Load page in main view</ContentBlockTitle>
					<List>
						<ListItem link="/about/" title="About" linkView="#main-view" linkClosePanel></ListItem>
						<ListItem link="/form/" title="Form" linkView="#main-view" linkClosePanel></ListItem>
					</List>
				</Page>
			</Pages>
		</View>
	</Panel>
);

LeftPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};

const RightPanel = (props, context) => (
	<Panel right cover layout="dark">
		<View id="right-panel-view" navbarThrough dynamicNavbar={true}>
			{context.framework7AppContext.theme.ios ? <Navbar title="Right Panel" sliding /> : null}
			<Pages>
				<Page>
					{context.framework7AppContext.theme.material ? <Navbar title="Right Panel" sliding /> : null}
					<ContentBlock>
						<p>Right panel content goes here</p>
					</ContentBlock>
					<ContentBlockTitle>Load page in panel</ContentBlockTitle>
					<List>
						<ListItem link="/about/" title="About"></ListItem>
						<ListItem link="/form/" title="Form"></ListItem>
					</List>
					<ContentBlockTitle>Load page in main view</ContentBlockTitle>
					<List>
						<ListItem link="/about/" title="About" linkView="#main-view" linkClosePanel></ListItem>
						<ListItem link="/form/" title="Form" linkView="#main-view" linkClosePanel></ListItem>
					</List>
				</Page>
			</Pages>
		</View>
	</Panel>
);

RightPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};

const MainViews = (props, context) => {
	return (
		<Views>
			<View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
				{/* Navbar */}
				{context.framework7AppContext.theme.ios ? (
					<Navbar>
						<NavLeft>
							<Link icon="icon-bars" openPanel="left" />
						</NavLeft>
						<NavCenter sliding>Framework7</NavCenter>
						<NavRight>
							<Link icon="icon-bars" openPanel="right"></Link>
						</NavRight>
					</Navbar>
				) : null}
				{/* Pages */}
				<Pages>
					<Page>
						{context.framework7AppContext.theme.material ? (
							<Navbar>
								<NavLeft>
									<Link icon="icon-bars" openPanel="left" />
								</NavLeft>
								<NavCenter sliding>Framework7</NavCenter>
								<NavRight>
									<Link icon="icon-bars" openPanel="right"></Link>
								</NavRight>
							</Navbar>
						) : null}						
						<ContentBlockTitle>ACCOUNT REST SVC TEST</ContentBlockTitle>
						<ContentBlock inner>
							<GridRow>
								<GridCol width={50}>
									<Button openPopup="#popup">CLICK ME!</Button>
								</GridCol>
							</GridRow>
						</ContentBlock>
						<ContentBlockTitle>Navigation</ContentBlockTitle>
						<List>
							<ListItem link="/about/" title="About"></ListItem>
							<ListItem link="/form/" title="Form"></ListItem>							
						</List>
						<ContentBlockTitle>Side Panels</ContentBlockTitle>
						<ContentBlock>
							<GridRow>
								<GridCol width={50}>
									<Button openPanel="left">Left Panel</Button>
								</GridCol>
								<GridCol width={50}>
									<Button openPanel="right">Right Panel</Button>
								</GridCol>
							</GridRow>
						</ContentBlock>
						<ContentBlockTitle>Modals</ContentBlockTitle>
						<ContentBlock>
							<GridRow>
								<GridCol width={50}>
									<Button openPopup="#popup">Popup</Button>
								</GridCol>
								<GridCol width={50}>
									<Button openLoginScreen="#login-screen">Login Screen</Button>
								</GridCol>
							</GridRow>
						</ContentBlock>
					</Page>
				</Pages>
			</View>
		</Views>
	);
};

MainViews.contextTypes = {
	framework7AppContext: PropTypes.object
};


class AppPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: 0.0,
            owner : '',
            number : undefined
        }
        this.handleChange = this.handleChange.bind(this)
    }

    callservice() {
    	 console.log("state number = " + this.state.number)
    	 let that = this;
         fetch('http://localhost:8080/accounts/' + this.state.number,{mode: 'cors'})
         .then(function(response) { 
		 console.log(response);
	     return response.json();
         }).then(function(j) {
	     console.log("json obj is " + j.balance); 
	     that.state.balance = j.balance;
	     that.change(j.balance)
         })
         

    	 
    }
   
    handleChange(event) {
    	this.setState({number: event.target.value});
    }

    change(balance) {
    	 this.setState({balance})
    }

    reset(number, balance) {
    	this.setState({balance})
        {/*Not supposed to change state in this way. demo only*/}
    	this.setState({number})
    }

	render() {
		const {balance} = this.state;
		return (
			<Popup id="popup">
				<View navbarFixed>
					<Pages>
						<Page>
							<Navbar title="Popup">
								<NavRight>
									<Link closePopup>Close</Link>
								</NavRight>
							</Navbar>
							<LoginScreenTitle>Get Balance</LoginScreenTitle>
							<List form>
								<ListItem>
									<FormLabel>Account#</FormLabel>
									<FormInput name="number" placeholder="Try 123456789" type="text" value={this.state.number} onChange={this.handleChange}/>
								</ListItem>
							</List>
							<List>
							    <ListLabel>
									<p>Balance is {balance}</p>
								</ListLabel>
							    <GridCol>
							    <Button round style={pStyle} onClick={() => this.callservice()}>Get</Button>
							    </GridCol>
							    <GridCol>
							    <Button round style={pStyle} onClick={() => (this.reset('',0.0))} >Clear</Button>
							    </GridCol>
							</List>
						</Page>
					</Pages>
				</View>
			</Popup> 
		);
	}
}

const AppLoginScreen = () => (
	<LoginScreen id="login-screen">
		<View>
			<Pages>
				<Page loginScreen>
					<LoginScreenTitle>Login</LoginScreenTitle>
					<List form>
						<ListItem>
							<FormLabel>Username</FormLabel>
							<FormInput name="username" placeholder="Username" type="text" />
						</ListItem>
						<ListItem>
							<FormLabel>Password</FormLabel>
							<FormInput name="password" type="password" placeholder="Password" />
						</ListItem>
					</List>
					<List>
						<ListButton title="Sign In" closeLoginScreen />
						<ListLabel>
							<p>Click Sign In to close Login Screen</p>
						</ListLabel>
					</List>
				</Page>
			</Pages>
		</View>
	</LoginScreen>
);

export const App = () => (	
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="ios" routes={routes}>		
		<Statusbar />		
		<LeftPanel />
		<RightPanel />
		<MainViews />
		<AppPopup />
		<AppLoginScreen />
	</Framework7App>  
);
