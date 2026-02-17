import { useForm } from "react-hook-form";

function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onsubmit(data) {
    console.log("Sign up:", data);
    alert(
      `Sign up successful with email: ${data.email} and password: ${data.password}`,
    );
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          {...register("email", { required: "email is required" })}
        />
        {errors.email && <p style={{ color: "red", margin: "4px 0 0", fontSize: "14px" }}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && <p style={{ color: "red", margin: "4px 0 0", fontSize: "14px" }}>{errors.password.message}</p>}
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUpForm;
