/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card } from "flowbite-react";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { login, LoginProps } from "../../../api/login";
import { useForm } from "react-hook-form";
import logo from "../../../assets/mathsie-icon.svg";
import { ErrorAlert } from "../../components/alerts/error-alert";
import { FormInput } from "../../components/form/input";

const SignInPage: FC = function () {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>();

  const [error, setError] = useState<string>();

  const onLogin = (data: LoginProps) => {
    return login(data)
      .then(() => navigate('/'))
      .catch(_ => setError("Invalid username or password"))
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="mathsie logo"
          src={logo}
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          mathsie
        </span>
      </div>
      <Card
        horizontal
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onLogin)}>
          {error && <ErrorAlert title="Login error:" message={error} />}
          <FormInput label="Email address" field="email" autoComplete="email" register={register} rules={{ required: true }} errors={errors} />
          <FormInput label="Password" field="password" type="password" autoComplete="current-password" register={register} rules={{ required: true }} errors={errors} />

          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Log in to your account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
