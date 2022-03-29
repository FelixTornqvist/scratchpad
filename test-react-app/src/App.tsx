import React, { FC } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Control, useFieldArray, useForm } from "react-hook-form";

interface FieldValues {
  user: {
    firstName: string;
    lastName: string;
    hobbies: { name: string }[];
  };
}

function App() {
  const { register, handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      user: {
        firstName: "",
        lastName: "",

        hobbies: [],
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "user.hobbies",
  });

  const onSubmit = (values: FieldValues) => {
    console.log("You submitted: ", values);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="firstname" {...register("user.firstName")} />
        </div>
        <div>
          <input placeholder="lastname" {...register("user.lastName")} />
          {/* <input placeholder="lastname" {...register("user.last_name")} /> <---- Typescript error! */}
        </div>

        {fields.map((field, index) => (
          <div>
            <input
              placeholder="hobby"
              key={field.id}
              {...register(`user.hobbies.${index}.name`)}
            />
            <button
              onClick={(eve) => {
                eve.preventDefault();
                remove(index);
              }}
            >
              Remove hobby
            </button>
          </div>
        ))}

        <button
          onClick={(eve) => {
            eve.preventDefault();
            append({ name: "" });
          }}
        >
          Add hobby
        </button>
      </form>
    </div>
  );
}

export default App;
