import { screen } from "@testing-library/react";
import { render } from "@testing-library/react"
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "../../../share/redux";
import Dashboard from "../Dashboard";
import { createMemoryHistory } from "history";
import { fireEvent } from "@testing-library/dom";
import * as Redux from "react-redux";

//useSelector mock
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

const history = createMemoryHistory();

const renderWithRouteAndStore = (Component) => render(
    <Provider store={store}>
        <Router navigator={history} location={history.location}>
            <Component />
        </Router>
    </Provider>
)
describe('Dashboard page', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        jest.spyOn(Redux, "useSelector").mockImplementation(init => init);
    });
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

    // should render sort button with item "Sort by "
    it('should render sort button with item "Sort by "', () => {
        renderWithRouteAndStore(Dashboard);
        const btn = screen.getByText(/Created At/i);
        expect(btn).toBeInTheDocument();
    });
    // if todoListStatus is loading should render loading
    it('if todoListStatus is loading should render loading', () => {
        jest.spyOn(Redux, "useSelector").mockImplementationOnce(() => ({
            todoList: [],
            todoListStatus: "loading"
        })).mockImplementation(state => state);
        renderWithRouteAndStore(Dashboard);
        const loading = screen.getByTestId(/dashboard-loader/i);
        expect(loading).toBeInTheDocument();
    });
});
