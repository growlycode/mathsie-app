import { useForm } from "react-hook-form";
import { login, LoginProps } from "../../../api/login";

import logo from "../../../assets/mathsie.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/form/input";
import { ErrorAlert } from "../../components/alerts/error-alert";
import { FormButton } from "../../components/buttons/form-button";

export const Login = () => {

  const navigate = useNavigate();

  const [error, setError] = useState<string>();

  const onLogin = (data: LoginProps) => {
    return login(data)
      .then(() => navigate('/'))
      .catch(_ => setError("Invalid username or password"))
  }


  const { register, handleSubmit } = useForm<LoginProps>();

  return (<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src={logo} alt="mathsie" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onLogin, e => console.log(e))}>

        {error && <ErrorAlert title="Login error:" message={error} />}
        <FormInput label="Email address" field="email" autoComplete="email" register={register} rules={{required: true}} />
        <FormInput label="Password" field="password" type="password" autoComplete="current-password" register={register} rules={{required: true}} />
        <div>
          <FormButton>Sign in</FormButton>
        </div>
      </form>
    </div>
  </div>);
}