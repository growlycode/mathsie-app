import { useForm } from "react-hook-form";
import { login, LoginProps } from "../../../api/login";

import logo from "../../../assets/mathsie.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/form/input";
import { ErrorAlert } from "../../components/alerts/error-alert";

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
          <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>);
}