import {render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vitest";

import App from '../src/App';
import {requests, server} from "./setupMSW";
import {rest} from "msw";

describe('App', () => {
    it('increments the count when the button is pressed', async () => {
        const user = userEvent.setup()
        render(<App/>);

        const countButton = screen.getByText('count is 0');
        expect(countButton).toBeInTheDocument()

        await user.click(countButton)
        expect(screen.getByText(/count is 1/)).toBeInTheDocument()
    });

    it('calls the API', async () => {
        render(<App/>);

        await waitFor(() => {
            expect(requests.length).toBeGreaterThan(0)
        })

        expect(requests[0].url.toString()).toEqual("https://example.com/")
    });

    it('displays the status code from the API call', async () => {
        server.use(
            rest.all(
                "https://example.com/",
                (req, res, ctx) => res(ctx.status(404))
            )
        )
        render(<App/>);

        await waitFor(() => {
            expect(screen.getByText(/404/i)).toBeInTheDocument()
        })
    });
});
