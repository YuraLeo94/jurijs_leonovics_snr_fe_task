import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./page";
import { useRouter } from "next/navigation";
import { AUTH, BALANCE_PATH } from "@/core/consts";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("shows error for incorrect email", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      AUTH.LOGIN.EMAIL_PLACEHOLDER
    );
    const passwordInput = screen.getByPlaceholderText(
      AUTH.LOGIN.PASSWORD_PLACEHOLDER
    );
    const loginButton = screen.getByText(AUTH.LOGIN.LOGIN_FORM_BUTTON_LABEL);

    fireEvent.change(emailInput, { target: { value: "incorrect@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "correct-password" } });
    fireEvent.click(loginButton);

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(AUTH.LOGIN.EMAIL_ERROR_MESSAGE)
      ).toBeInTheDocument();
    });
  });

  test("shows error for incorrect password", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      AUTH.LOGIN.EMAIL_PLACEHOLDER
    );
    const passwordInput = screen.getByPlaceholderText(
      AUTH.LOGIN.PASSWORD_PLACEHOLDER
    );
    const loginButton = screen.getByText(AUTH.LOGIN.LOGIN_FORM_BUTTON_LABEL);

    fireEvent.change(emailInput, { target: { value: "correct@email.com" } });
    fireEvent.change(passwordInput, {
      target: { value: "incorrect-password" },
    });
    fireEvent.click(loginButton);

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(AUTH.LOGIN.PASSWORD_ERROR_MESSAGE)
      ).toBeInTheDocument();
    });
  });

  test("navigates to OTP step on correct email and password", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      AUTH.LOGIN.EMAIL_PLACEHOLDER
    );
    const passwordInput = screen.getByPlaceholderText(
      AUTH.LOGIN.PASSWORD_PLACEHOLDER
    );
    const loginButton = screen.getByText(AUTH.LOGIN.LOGIN_FORM_BUTTON_LABEL);

    fireEvent.change(emailInput, { target: { value: "correct@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "correct-password" } });
    fireEvent.click(loginButton);

    // Wait for the OTP step to be shown (increase timeout to handle async behavior)
    await waitFor(
      () => {
        expect(screen.getByText(AUTH.LOGIN.OTP_FORM_TITLE)).toBeInTheDocument();
      },
      { timeout: 3000 }
    ); // Increased timeout
  });

  test("navigates to BALANCE_PATH after OTP submit", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      AUTH.LOGIN.EMAIL_PLACEHOLDER
    );
    const passwordInput = screen.getByPlaceholderText(
      AUTH.LOGIN.PASSWORD_PLACEHOLDER
    );
    const loginButton = screen.getByText(AUTH.LOGIN.LOGIN_FORM_BUTTON_LABEL);

    fireEvent.change(emailInput, { target: { value: "correct@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "correct-password" } });
    fireEvent.click(loginButton);

    // Wait for the OTP step to be shown (increase timeout)
    await waitFor(
      () => {
        expect(screen.getByText(AUTH.LOGIN.OTP_FORM_TITLE)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const otpInput = screen.getByPlaceholderText(AUTH.LOGIN.OTP_PLACEHOLDER);
    fireEvent.change(otpInput, { target: { value: "123456" } });
    const submitButton = screen.getByText(AUTH.LOGIN.OTP_FORM_BUTTON_LABEL);

    fireEvent.click(submitButton);

    // Wait for navigation to BALANCE_PATH (increased timeout)
    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith(BALANCE_PATH);
      },
      { timeout: 3000 }
    );
  });

  test("matches the snapshot", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
