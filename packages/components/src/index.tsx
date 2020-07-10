import React from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export function Hello(props: HelloProps): JSX.Element {
  return (
    <h1>
      Hello from {props.compiler} and {props.framework}!
    </h1>
  );
}
