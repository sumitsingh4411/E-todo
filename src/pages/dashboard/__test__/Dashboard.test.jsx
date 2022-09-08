import { screen } from "@testing-library/react";
import { render } from "@testing-library/react"
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import store from "../../../share/redux";
import Dashboard from "../Dashboard";
import { createMemoryHistory } from "history";
import { URLPath } from "../../../share/constant";
import { fireEvent } from "@testing-library/dom";

const history = createMemoryHistory();

const renderWithRouteAndStore = (Component) => render(
    <Provider store={store}>
        <Router navigator={history} location={history.location}>
            <Component />
        </Router>
    </Provider>
)
describe('Dashboard page', () => {

    // should render text "Todos"
    it('should render text "Todos"', () => {
        renderWithRouteAndStore(Dashboard);
        const text = screen.getByText(/Todos/i);
        expect(text).toBeInTheDocument();
    })

    // should render a button "new todo" and click it open modal
    it('should render a button "new todo" and click it open modal', () => {
        renderWithRouteAndStore(Dashboard);
        const btn = screen.getByRole('button', { name: /new todo/i });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
    });

    
});
