import InitForm from "../InitForm/InitForm";
import { LightBackground } from "./App_Stytles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../Main/Main";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/main" render={(props) => <Main {...props} />} />
				<Route path="/">
					<LightBackground>
						<InitForm />
					</LightBackground>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
