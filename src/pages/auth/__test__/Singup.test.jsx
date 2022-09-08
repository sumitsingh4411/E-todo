import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import store from "../../../share/redux";
import Signup from "../Signup";

const history = createMemoryHistory();

const renderWithRouteAndStore = (Component) => render(
    <Provider store={store}>
        <Router navigator={history} location={history.location}>
            <Component />
        </Router>
    </Provider>
)
describe('Signup page', () => {
    // should render text "Register"
    it('should render text "Register"', () => {
        renderWithRouteAndStore(Signup);
        const text = screen.getByRole('heading', { name: /Register/i });
        expect(text).toBeInTheDocument();
    });

    // should render a button "Register" and click it send to dashboard
    it('should render a button "Register" and click it send to dashboard', () => {
        renderWithRouteAndStore(Signup);
        const btn = screen.getByRole('button', { name: /register/i });
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    //shoudl have a tag "Already have an account? Login" and click it send to login
    it('shoudl have a tag "Login now." and click it send to login', () => {
        renderWithRouteAndStore(Signup);
        const a = screen.getByText(/Login now./i);
        fireEvent.click(a);
        expect(history.location.pathname).toBe('/login');
        expect(a).toBeInTheDocument();
    });
});