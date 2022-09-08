import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import store from "../../../share/redux";
import Signup from "../Signup";
import Signin from "../SignIn";

const history = createMemoryHistory();

const renderWithRouteAndStore = (Component) => render(
    <Provider store={store}>
        <Router navigator={history} location={history.location}>
            <Component />
        </Router>
    </Provider>
)
describe('SignIn page', () => {
    // should render text "Login"
    it('should render text "Login"', () => {
        renderWithRouteAndStore(Signin());
        const text = screen.getByRole('heading', { name: /Login/i });
        expect(text).toBeInTheDocument();
    });

    // should render a button "Login" and click it send to dashboard
    it('should render a button "Login" and click it send to dashboard', () => {
        renderWithRouteAndStore(Signup);
        const btn = screen.getByRole('button', { name: /Login/i });
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    //shoudl have a tag "Register now." and click it send to register
    it('shoudl have a tag "Register now." and click it send to register', () => {
        renderWithRouteAndStore(Signup);
        const a = screen.getByText(/Register now./i);
        fireEvent.click(a);
        expect(history.location.pathname).toBe('/register');
        expect(a).toBeInTheDocument();
    });
});