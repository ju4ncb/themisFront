import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import "./auth-form.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  submitText: string;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: any) => void;
  centerInputs?: boolean;
}

const AuthForm = ({
  title,
  children,
  submitText,
  handleSubmit,
  onSubmit,
  centerInputs,
}: Props) => {
  return (
    <form
      className={centerInputs ? "auth-form justify-content" : "auth-form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="auth-title">{title}</h1>
      {children}
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default AuthForm;
