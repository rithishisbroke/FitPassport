export type AuthFormField =
  | "fullName"
  | "email"
  | "password"
  | "confirmPassword";

export type AuthFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<AuthFormField, string>>;
};

export const initialAuthFormState: AuthFormState = { status: "idle" };
